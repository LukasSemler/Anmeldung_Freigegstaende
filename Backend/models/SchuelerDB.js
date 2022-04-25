//Pool impotieren
import { pool } from '../DB/index.js';

const client = await pool.connect();

//! Schüler in Freifach anmelden
const SchuelerInFreifachAnmeldenDB = async (s_id, f_id) => {
  try {
    client.query('INSERT INTO freifach_bucht (f_fk, s_fk) VALUES ($1, $2)', [f_id, s_id]);

    return true;
  } catch (error) {
    return false;
  } finally {
    // client.release();
  }
};

//! Schüler von Freifach abmelden
const SchueleVonFreifachAbmeldenDB = async (s_id, f_id) => {
  try {
    client.query('DELETE FROM freifach_bucht WHERE f_fk = $1 AND s_fk = $2;', [f_id, s_id]);

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
    const result = await client.query(
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
    client.query('DELETE FROM freifach_bucht WHERE f_fk = $1;', [s_id]);

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
