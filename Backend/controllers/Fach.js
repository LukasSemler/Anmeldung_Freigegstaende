import path from 'path';
import fs from 'fs';
import postgres from 'pg';

//Postgres Pool erstellen
const { Pool } = postgres;
let aktiverClient;

//DB Funktionen
function DatenbankVerbinden() {
  // Development
  aktiverClient = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'freifaecher',
    password: 'postgres',
    port: 5432,
  });

  //Production
  // aktiverClient = new Pool({
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // });

  aktiverClient.connect();
}

function DatenbankTrennen() {
  aktiverClient.end();
  aktiverClient = null;
}

const dirname = path.resolve();

const fachErstellen = async (req, res) => {
  const daten = req.body;
  console.log(daten);
  //Datenbank Verbindung herstellen
  DatenbankVerbinden();

  aktiverClient.query(
    'INSERT INTO freifach_tbl (titel, beschreibung, thumbnail, anzahl_stunden, min_schueler, max_schueler, voraussetzungen) VALUES ($1, $2, $3, $4, $5, $6, $7);',
    [
      daten.titel,
      daten.beschreibung,
      daten.linkThumbnail,
      daten.selected,
      daten.numberMin,
      daten.numberMax,
      daten.voraussetzungen,
    ],
  );

  aktiverClient.query(
    'INSERT INTO freifach_betreut (l_fk, f_fk) VALUES ((SELECT l_id from lehrer_tbl WHERE email = $1), (SELECT f_id from freifach_tbl WHERE titel = $2));',
    [daten.lehrer.email, daten.titel],
  );
};

const fachThumbnail = (req, res) => {
  try {
    const titel = req.body.titel;
    const uniqueImageName = path.join(dirname, `\\public\\images\\${titel}.jpg`);
    fs.writeFileSync(`${uniqueImageName}`, req.files.image.data);

    res.status(200).send('Success');
  } catch {
    res.status(400).send('Something went wrong');
  }
};

const getAdminTimeLine = async (req, res) => {
  DatenbankVerbinden();

  const result = await aktiverClient.query('SELECT * FROM admintimeline_tbl ORDER BY t_id ASC ; ');
  console.log(result.rows);

  res.status(200).json(result.rows);
};

const setFristenChangeTimeLine = async (req, res) => {
  //DatenbankVerbinden
  DatenbankVerbinden();

  const changeTimeLine = req.body[0];
  const setFristen = req.body[1];

  try {
    //Timeline aendern
    let resultChangeTimeLine = await aktiverClient.query(
      'UPDATE admintimeline_tbl SET data = $1, icon = $2, iconbackground = $3 WHERE t_id = 1;',
      [changeTimeLine.datum, changeTimeLine.icon, changeTimeLine.iconbackground],
    );

    //Fristen setzen
    let resultSetFristen = await aktiverClient.query(
      'INSERT INTO fristen (frist_einreichen, frist_anmelden) VALUES ($1, $2);',
      [setFristen.fristEinreichen, setFristen.fristAnmelden],
    );

    res.status(200).send('Success');
  } catch (error) {
    res.status(500).send('Etwas ist schief gelaufen');
  }
};

const getFristen = async (req, res) => {
  DatenbankVerbinden();

  const result = await aktiverClient.query('SELECT * FROM fristen');

  res.status(200).json(result.rows);
};

const getFreifaecher = async (req, res) => {
  const email = req.query.email;
  console.log(email);
  //Datenbank verbinden
  DatenbankVerbinden();

  try {
    const result = await aktiverClient.query(
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
         voraussetzungen
  from freifach_tbl
           JOIN freifach_betreut fb on freifach_tbl.f_id = fb.f_fk
           JOIN lehrer_tbl lt on lt.l_id = fb.l_fk WHERE email = $1;`,
      [email],
    );

    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch {
    res.status(500).send('Fehler');
  }
};

const lehrerSchülerAnmelden = async (req, res) => {
  //Wichtige Variablen
  let schonMalVerbundenGewesen = false;
  const GoogleUser = req.body;

  //Schauen ob der User, der sich einloggen will, ein HTLWienwest-Mitglied ist
  if (!GoogleUser.email.includes('@htlwienwest.at')) {
    res.status(210).send('Du bist leider kein Mitglied der HTL WienWest!');
    return;
  }

  //Schauen ob User schon mal verbunden war
  DatenbankVerbinden();

  if (GoogleUser.isLehrer) {
    //Ist ein Lehrer
    aktiverClient.query(
      'SELECT email FROM lehrer_tbl WHERE email = $1',
      [GoogleUser.email],
      (error, result) => {
        if (!error) {
          //Schauen ob Lehrer schon mal verbunden war
          if (result.rowCount == 0) {
            //Wenn der Schüler noch nicht in der Datenbank ist
            aktiverClient.query(
              'INSERT INTO lehrer_tbl (vorname, nachname, email, icon) VALUES ($1, $2, $3, $4)',
              [
                GoogleUser.name.split(' ')[0],
                GoogleUser.name.split(' ')[1],
                GoogleUser.email,
                GoogleUser.icon,
              ],
              (errorEintrag, resultEintrag) => {
                if (!errorEintrag) {
                  //Lehrer nach Eintrag zurückgeben
                  aktiverClient.query(
                    'SELECT * FROM lehrer_tbl WHERE email = $1',
                    [GoogleUser.email],
                    (errorSuche, resultSuche) => {
                      let User = resultSuche.rows[0];
                      User.isLehrer = true;

                      //Server-Result setzen
                      res.status(200).json(User);
                    },
                  );
                } else {
                  //Server-Result setzen
                  res.status(210).send('Fehler beim Eintragen des Lehrer');
                }
              },
            );
          }
          //Wenn der Lehrer in der Datenbank gefunden wurde diesen Zurückgeben
          else {
            aktiverClient.query(
              'SELECT * FROM lehrer_tbl WHERE email = $1',
              [GoogleUser.email],
              (errorSuche, resultSuche) => {
                if (!errorSuche) {
                  let User = resultSuche.rows[0];
                  User.isLehrer = true;

                  //Server-Result setzen
                  res.status(200).json(User);
                } else {
                  //Server-Result setzen
                  res.status(210).send('Fehler beim Ausgeben des vorhandenen Users');
                }
              },
            );
          }
        }
      },
    );
  } else {
    //Ist ein Schüler
    aktiverClient.query(
      'SELECT email FROM schueler_tbl WHERE email = $1',
      [GoogleUser.email],
      (error, result) => {
        if (!error) {
          //Schauen ob Schüler schon mal verbunden war
          if (result.rowCount == 0) {
            //Wenn der Schüler noch nicht in der Datenbank ist
            aktiverClient.query(
              'INSERT INTO schueler_tbl (vorname, nachname, email, klasse, icon) VALUES ($1, $2, $3, $4, $5)',
              [
                GoogleUser.name.split(' ')[0],
                GoogleUser.name.split(' ')[1],
                GoogleUser.email,
                GoogleUser.klasse,
                GoogleUser.icon,
              ],
              (errorEintrag, resultEintrag) => {
                if (!errorEintrag) {
                  console.log('Schüler erfolgreich in die Datenbank eingespeichert!');
                  //Schüler nach Eintrag zurückgeben
                  aktiverClient.query(
                    'SELECT * FROM schueler_tbl WHERE email = $1',
                    [GoogleUser.email],
                    (errorSuche, resultSuche) => {
                      let User = resultSuche.rows[0];
                      User.isAdmin = false;
                      User.isLehrer = false;

                      //Server-Result setzen
                      res.status(200).json(User);
                    },
                  );
                } else {
                  //Server-Result setzen
                  res.status(210).send('Fehler beim Eintragen des Schülers');
                }
              },
            );
          }
          //Wenn der Schüler in der Datenbank gefunden wurde diesen Zurückgeben
          else {
            aktiverClient.query(
              'SELECT * FROM schueler_tbl WHERE email = $1',
              [GoogleUser.email],
              (errorSuche, resultSuche) => {
                if (!errorSuche) {
                  let User = resultSuche.rows[0];
                  User.isAdmin = false;
                  User.isLehrer = false;

                  //Server-Result setzen
                  res.status(200).json(User);
                } else {
                  //Server-Result setzen
                  res.status(210).send('Fehler beim Ausgeben des vorhandenen Users');
                }
              },
            );
          }
        }
      },
    );
  }
};

export {
  fachErstellen,
  fachThumbnail,
  getAdminTimeLine,
  setFristenChangeTimeLine,
  getFristen,
  getFreifaecher,
  lehrerSchülerAnmelden,
};
