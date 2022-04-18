// Pool impotieren
import { pool } from '../DB/index.js';

const client = await pool.connect();

const setFristenChangeTimeLineDB = async (changeTimeLine, setFristen) => {
  try {
    let querys = [];

    //Transaktion beginnnen
    await client.query('BEGINN');

    //Ersten Befehl pushen
    querys.push(
      client.query(
        'UPDATE admintimeline_tbl SET data = $1, icon = $2, iconbackground = $3 WHERE t_id = 1;',
      ),
      [changeTimeLine.datum, changeTimeLine.icon, changeTimeLine.iconbackground],
    );

    //Zweiten Befehl Pushen
    querys.push(
      client.query('INSERT INTO fristen (frist_einreichen, frist_anmelden) VALUES ($1, $2);', [
        setFristen.fristEinreichen,
        setFristen.fristAnmelden,
      ]),
    );

    //Befehle ausführen
    await Promise.all(querys);

    //Transaktion abschließen
    await client.query('COMMIT');

    return true;
  } catch (error) {
    //Fehler ausgeben
    console.log(error.message);

    //Datenbank Rollback
    await client.query('ROLLBACK');

    return false;
  } finally {
    // client.release();
  }
};

const getAdminTimeLineDB = async () => {
  try {
    //Rows bekommen
    const { rows } = await client.query('SELECT * FROM admintimeline_tbl ORDER BY t_id ASC; ');

    return rows;
  } catch (error) {
    console.log(error.message);

    return false;
  } finally {
    // client.release();
  }
};

const getFristenDB = async () => {
  try {
    // Rows bekommen
    const { rows } = await client.query('SELECT * FROM fristen; ');

    return rows;
  } catch (error) {
    console.log(error.message);

    return false;
  } finally {
    // client.release();
  }
};

const getFaecherFromStudentDB = async (id) => {
  try {
    const { rows } = await client.query(
      "SELECT titel, vorname, nachname, status from freifach_tbl JOIN freifach_bucht fb on freifach_tbl.f_id = fb.f_fk JOIN schueler_tbl st on st.s_id = fb.s_fk WHERE s_id = $1 and status = 'true';",
      [id],
    );

    if (rows) return rows;
    else return false;
  } catch (error) {
    console.log(error.message);
    return false;
  } finally {
    // client.release();
  }
};

export { setFristenChangeTimeLineDB, getAdminTimeLineDB, getFristenDB, getFaecherFromStudentDB };
