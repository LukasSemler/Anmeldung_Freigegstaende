// Pool impotieren
import { pool } from '../DB/index.js';

const client = await pool.connect();

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
  let querys = [];
  try {
    //Tranaktion
    await client.query('BEGIN');
    //Ersten Befehl pushen
    querys.push(
      client.query(
        'INSERT INTO freifach_tbl (titel, beschreibung, thumbnail, anzahl_stunden, min_schueler, max_schueler, voraussetzungen) VALUES ($1, $2, $3, $4, $5, $6, $7);',
      ),
      [titel, beschreibung, linkThumbnail, selected, numberMin, numberMax, voraussetzungen],
    );
    //Zweiten Befehl pushen
    querys.push(
      client.query(
        'INSERT INTO freifach_betreut (l_fk, f_fk) VALUES ((SELECT l_id from lehrer_tbl WHERE email = $1), (SELECT f_id from freifach_tbl WHERE titel = $2));',
      ),
      [lehrer.email, titel],
    );

    //Befehle ausführen
    await Promis.all(querys);

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
    // client.release();
  }
};

const fachLöschenDB = async (fachID, lehrerID) => {
  try {
    let querys = [];

    //Transaktion beginnnen
    await client.query('BEGINN');

    //Querys Pushen
    querys.push(client.query(`DELETE FROM freifach_tbl WHERE f_id = $1;`, [fachID]));
    querys.push(aktiverClient.query('DELETE FROM freifach_betreut WHERE l_fk = $1;', [lehrerID]));

    //Promises erledigen
    await Promise.all(querys);

    //Transaktion abschließen
    await client.query('COMMIT');

    return true;
  } catch (error) {
    //Tranaktion abbrechen
    await client.query('FALLBACK');

    //Fehler ausgeben
    console.log(error.message);

    return false;
  } finally {
    //Client releasen
    // client.release();
  }
};

const getFreifaecherDB = async (email) => {
  if (email) {
    //? Wenn eine Email vorhanden ist
    try {
      const result = await client.query(
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
           icon
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
      const result = await client.query(
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
      client.query(
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
          id,
        ],
      );
    } else {
      client.query(
        'UPDATE freifach_tbl SET titel = $1, beschreibung = $2, anzahl_stunden = $3, max_schueler = $4, min_schueler = $5, voraussetzungen = $6, gewichtung = $7  WHERE f_id = $8',
        [
          body.titel,
          body.beschreibung,
          body.selected,
          body.numberMax,
          body.numberMin,
          body.voraussetzungen,
          body.gewichtung,
          id,
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
  return await client.query('SELECT thumbnail from freifach_tbl where f_id = $1;', [fachID]);
};

export { fachErstellenDB, fachLöschenDB, fachThumbnailEntfernen, getFreifaecherDB, changeFachDB };
