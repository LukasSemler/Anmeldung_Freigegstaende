// Pool impotieren
import { pool, query } from '../DB/index.js';

// const client = await pool.connect();

const fachErstellenDB = async (
  titel,
  beschreibung,
  linkThumbnail,
  selected,
  numberMin,
  numberMax,
  voraussetzungen,
  lehrer,
) => {
  //Client erstellen
  const client = await pool.connect();

  try {
    //Tranaktion
    await client.query('BEGIN');

    //ID vom Lehrer bekommen
    const lehrerID = await client.query('SELECT l_id FROM lehrer_tbl WHERE email = $1;', [
      lehrer.email,
    ]);

    // Schaue ob das Freifach schon vorhanden ist
    const { rows: vorhanden } = await client.query(
      'SELECT titel from freifach_tbl where titel = $1;',
      [titel],
    );

    if (vorhanden[0]) return null;

    //Freifach erstellen
    const { rows } = await client.query(
      'INSERT INTO freifach_tbl (titel, beschreibung, thumbnail, anzahl_stunden, min_schueler, max_schueler, voraussetzungen) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *;',
      [titel, beschreibung, linkThumbnail, selected, numberMin, numberMax, voraussetzungen],
    );

    const fachID = rows[0].f_id;

    //ID vom Fach bekommen
    // const fachID = await client.query('SELECT f_id FROM freifach_tbl WHERE titel = $1;', [titel]);

    console.log('LehrerID: ' + lehrerID.rows[0].l_id);
    console.log('FachID: ' + fachID);

    //Freifach zu Lehrer hinzufügen
    await client.query('INSERT INTO freifach_betreut (l_fk, f_fk) VALUES ($1, $2);', [
      lehrerID.rows[0].l_id,
      fachID,
    ]);

    //Transaktion abschließen
    await client.query('COMMIT');

    return true;
  } catch (error) {
    //Datenbank wiederherstellen mittels transaktion
    await client.query('ROLLBACK');
    //Fehler ausgeben
    console.log(error.message);

    return false;
  } finally {
    client.release();
  }
};

const fachLöschenDB = async (fachID, lehrerEmail) => {
  //Client erstellen
  const client = await pool.connect();
  try {
    //Transaktion beginnnen
    await client.query('BEGIN');

    const lehrerID = await client.query('SELECT l_id FROM lehrer_tbl WHERE email = $1;', [
      lehrerEmail,
    ]);

    console.log(lehrerID.rows[0].l_id);

    await client.query(`DELETE FROM freifach_tbl WHERE f_id = $1;`, [fachID]);
    await client.query('DELETE FROM freifach_betreut WHERE l_fk = $1 and f_fk = $2;', [
      lehrerID.rows[0].l_id,
      fachID,
    ]);

    //Transaktion abschließen
    await client.query('COMMIT');

    return true;
  } catch (error) {
    //Tranaktion abbrechen
    await client.query('ROLLBACK');

    //Fehler ausgeben
    console.log(error.message);

    return false;
  } finally {
    //Client releasen
    client.release();
  }
};

const getFreifaecherDB = async (email) => {
  if (email) {
    //? Wenn eine Email vorhanden ist
    try {
      const result = await query(
        `SELECT f_id,
           titel,
           beschreibung,
           thumbnail,
           anzahl_stunden,
           min_schueler,
           max_schueler,
           genehmigt,
           vorname,
           nachname,
           email, 
           voraussetzungen, 
           icon,
           gewichtung
    from freifach_tbl
             JOIN freifach_betreut fb on freifach_tbl.f_id = fb.f_fk
             JOIN lehrer_tbl lt on lt.l_id = fb.l_fk WHERE email = $1;`,
        [email],
      );

      return result.rows;
    } catch (error) {
      console.log(error.message);

      return false;
    } finally {
      // client.release();
    }
  } else {
    //? Wenn keine Email vorhanden ist
    try {
      const result = await query(
        'SELECT f_id, titel, beschreibung, thumbnail, anzahl_stunden, min_schueler, max_schueler, genehmigt, voraussetzungen FROM freifach_tbl',
      );

      return result.rows;
    } catch (error) {
      console.log(error.message);

      return false;
    } finally {
      // client.release();
    }
  }
};

const changeFachDB = async (id, body) => {
  try {
    if (body.linkThumbnail) {
      await query(
        'UPDATE freifach_tbl SET titel = $1, beschreibung = $2, anzahl_stunden = $3, max_schueler = $4, min_schueler = $5, voraussetzungen = $6, thumbnail = $7, gewichtung = $8  WHERE f_id = $9',
        [
          body.titel,
          body.beschreibung,
          body.selected,
          body.numberMax,
          body.numberMin,
          body.voraussetzungen,
          body.linkThumbnail,
          body.gewichtung,
          Number(id),
        ],
      );
    } else {
      await query(
        'UPDATE freifach_tbl SET titel = $1, beschreibung = $2, anzahl_stunden = $3, max_schueler = $4, min_schueler = $5, voraussetzungen = $6, gewichtung = $7  WHERE f_id = $8',
        [
          body.titel,
          body.beschreibung,
          body.selected,
          body.numberMax,
          body.numberMin,
          body.voraussetzungen,
          body.gewichtung,
          Number(id),
        ],
      );
    }

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  } finally {
    // client.release();
  }
};

const fachThumbnailEntfernen = async (fachID) => {
  console.log('FachID: ' + fachID);
  const { rows } = await query('SELECT thumbnail from freifach_tbl where f_id = $1;', [fachID]);

  return rows[0].thumbnail;
};

export { fachErstellenDB, fachLöschenDB, fachThumbnailEntfernen, getFreifaecherDB, changeFachDB };
