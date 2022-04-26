//Pool impotieren
import { pool, query } from '../DB/index.js';

const client = await pool.connect();

const getFaecherAdminDB = async () => {
  try {
    const { rows } = await query(`SELECT f_id,
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
           JOIN lehrer_tbl lt on lt.l_id = fb.l_fk;`);

    return rows;
  } catch (error) {
    console.log(error.message);

    return false;
  } finally {
    // client.release();
  }
};

const acceptFachDB = async (id, state) => {
  try {
    query('UPDATE freifach_tbl SET genehmigt = $1 WHERE f_id = $2; ', [state, id]);

    return true
  } catch (error) {
    console.log(error.message);

    return false;
  } finally {
    // client.release();
  }
};

export { getFaecherAdminDB, acceptFachDB };
