//Pool impotieren
import { query, pool } from '../DB/index.js';

//! Schüler in Freifach anmelden
const SchuelerInFreifachAnmeldenDB = async (s_id, f_id) => {
  try {
    //Schauen ob schüler schon in freifach ist
    const { rows } = await query(
      'SELECT SUM(ft.gewichtung) AS "AnzahlGewichtung" FROM freifach_bucht INNER JOIN freifach_tbl ft on ft.f_id = freifach_bucht.f_fk WHERE s_fk = $1;',
      [s_id],
    );

    console.log(Number(rows[0].AnzahlGewichtung));

    if (Number(rows[0].AnzahlGewichtung) < 2 || rows[0] === null) {
      const erg = await query('INSERT INTO freifach_bucht (f_fk, s_fk) VALUES ($1, $2)', [
        f_id,
        s_id,
      ]);

      return true;
    } else {
      return 'toMuch';
    }
  } catch (error) {
    console.log(error.message);
    return false;
  } finally {
    // client.release();
  }
};

//! Schüler von Freifach abmelden
const SchueleVonFreifachAbmeldenDB = async (s_id, f_id) => {
  try {
    query('DELETE FROM freifach_bucht WHERE f_fk = $1 AND s_fk = $2;', [f_id, s_id]);

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  } finally {
    // client.release();
  }
};

//! Fächer vom Schüler bekommen
const getFaecherSchuelerDB = async (s_id) => {
  try {
    const result = await query(
      `SELECT f_id,
       titel,
       beschreibung,
       thumbnail,
       anzahl_stunden,
       min_schueler,
       max_schueler,
       vorname,
       nachname,
       email,
       voraussetzungen,
       icon
from freifach_tbl
         JOIN freifach_bucht fb on freifach_tbl.f_id = fb.f_fk
         JOIN schueler_tbl st on st.s_id = fb.s_fk
WHERE s_fk = $1 `,
      [s_id],
    );

    return result.rows;
  } catch (error) {
    console.log(error.message);
    return false;
  } finally {
    // client.release();
  }
};

const schuelerAbmeldenDB = async (s_id) => {
  try {
    query('DELETE FROM freifach_bucht WHERE f_fk = $1;', [s_id]);

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  } finally {
    // client.release();
  }
};

export {
  SchuelerInFreifachAnmeldenDB,
  SchueleVonFreifachAbmeldenDB,
  getFaecherSchuelerDB,
  schuelerAbmeldenDB,
};
