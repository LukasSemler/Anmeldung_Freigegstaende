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
           JOIN lehrer_tbl lt on lt.l_id = fb.l_fk ORDER BY titel ASC;`);

    return rows;
  } catch (error) {
    console.log(error.message);

    return false;
  }
};

const acceptFachDB = async (id, state) => {
  try {
    console.log('DB');
    const { rows } = await query(
      'UPDATE freifach_tbl SET genehmigt = $1 WHERE f_id = $2 returning *; ',
      [state, id],
    );

    console.log('Rows');
    console.log(rows);

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  }
};

export { getFaecherAdminDB, acceptFachDB };
