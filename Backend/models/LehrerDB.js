/* eslint-disable import/extensions */
// Pool impotieren
import { pool } from '../DB/index.js';

const client = await pool.connect();

const getFreifaecherLehrerDB = async (freifachname) => {
  try {
    const { rows } = await client.query(
      `SELECT lt.vorname, lt.nachname, lt.email, lt.icon
    FROM freifach_tbl
    INNER JOIN freifach_betreut fb on freifach_tbl.f_id = fb.f_fk
    INNER JOIN lehrer_tbl lt on lt.l_id = fb.l_fk
    WHERE titel = $1`,
      [freifachname],
    );

    return rows;
  } catch (error) {
    console.log(error.message);

    return false;
  } finally {
    // client.release();
  }
};

const accepDeclineStudentDB = async (status, id, fachID) => {
  try {
    //Schüler annehmen oder wenn nicht direkt entfernen
    if (status === 'true') {
      client.query(`UPDATE freifach_bucht SET status = $1 WHERE s_fk = $2 and f_fk = $3;`, [
        status,
        id,
        fachID,
      ]);
    } else {
      client.query(`DELETE FROM freifach_bucht WHERE f_fk = $1 AND s_fk = $2`, [fachID, id]);
    }

    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  } finally {
    // client.release();
  }
};

const getSchuelerFaecherDB = async (id) => {
  try {
    const { rows } = await client.query(
      `SELECT s_id,
       vorname,
       nachname,
       klasse,
       email,
       icon,
       titel,
       beschreibung,
       status
from schueler_tbl
         JOIN freifach_bucht fb on schueler_tbl.s_id = fb.s_fk
         JOIN freifach_tbl ft on ft.f_id = fb.f_fk
WHERE f_id = $1`,
      [id],
    );

    console.log(rows);
    if (rows) return rows;
    else return false;
  } catch (error) {
    console.log(error.message);
    return false;
  } finally {
    // client.release();
  }
};

export { getFreifaecherLehrerDB, accepDeclineStudentDB, getSchuelerFaecherDB };
