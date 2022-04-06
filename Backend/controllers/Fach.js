import path from 'path';
import fs from 'fs';
import postgres from 'pg';

//Variablen
const dirname = path.resolve();

//PostgreSQL-Variablen
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

const fachErstellen = async (req, res) => {
  const daten = req.body;
  //Datenbank Verbindung herstellen
  DatenbankVerbinden();
  try {
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
      (errFreifachErstellen) => {
        if (errFreifachErstellen) {
          console.log('Error beim Erstellen des Freifachs');
          console.log(errFreifachErstellen);
          res.status(500).send('Fehler beim erstellen des Freifaches --> BETREUT');
        }
      },
    );

    aktiverClient.query(
      'INSERT INTO freifach_betreut (l_fk, f_fk) VALUES ((SELECT l_id from lehrer_tbl WHERE email = $1), (SELECT f_id from freifach_tbl WHERE titel = $2));',
      [daten.lehrer.email, daten.titel],
      (errFreifachBetreut) => {
        if (errFreifachBetreut) {
          res.status(510).send('Fehler beim erstellen des Freifaches --> BETREUT');
        }
      },
    );
    res.status(200).send('Freifach erfolgreich erstellt und Betreuer hinzugefügt!');
  } catch (error) {
    console.log('Error beim Erstellen des Freifachs');
    console.log(error);
  }

  DatenbankTrennen();
};

//Um ein Thumbnail im public/images Ordner zu speichern
const fachThumbnail = (req, res) => {
  try {
    const { titel, datentyp } = req.body;
    const uniqueImageName = path.join(dirname, `public/images/${titel}.${datentyp}`);
    //schauen ob das Bild schon existiert, wenn ja löschen und neu erstellen
    if (fs.existsSync(`${dirname}/public/images/${titel}.${datentyp}`)) {
      fs.unlinkSync(`${dirname}/public/images/${titel}.${datentyp}`);
    }

    fs.writeFileSync(`${uniqueImageName}`, req.files.image.data);

    res.status(200).send('Success');
  } catch (error) {
    console.log(error);
    res.status(400).send('Something went wrong');
  }
};

const getAdminTimeLine = async (req, res) => {
  DatenbankVerbinden();

  const result = await aktiverClient.query('SELECT * FROM admintimeline_tbl ORDER BY t_id ASC ; ');

  res.status(200).json(result.rows);

  DatenbankTrennen();
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

  DatenbankTrennen();
};

const getFristen = async (req, res) => {
  DatenbankVerbinden();

  const result = await aktiverClient.query('SELECT * FROM fristen');

  res.status(200).json(result.rows);
};

const getFreifaecher = async (req, res) => {
  const email = req.query.email;
  //Datenbank verbinden
  DatenbankVerbinden();

  //Wenn Email-Query dabei ist
  if (email) {
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
           voraussetzungen, 
           icon
    from freifach_tbl
             JOIN freifach_betreut fb on freifach_tbl.f_id = fb.f_fk
             JOIN lehrer_tbl lt on lt.l_id = fb.l_fk WHERE email = $1;`,
        [email],
      );

      res.status(200).json(result.rows);
    } catch {
      res.status(500).send('Fehler');
    }
  } else {
    //Hier bekommt man alle Freifächer die es gibt zurück!
    await aktiverClient.query(
      'SELECT f_id, titel, beschreibung, thumbnail, anzahl_stunden, min_schueler, max_schueler, genehmigt, voraussetzungen FROM freifach_tbl',
      (err, results) => {
        if (!err) {
          res.status(200).json(results.rows);
        } else {
          res.status(210).send('Fehler beim bekommen aller Freifächer');
        }
      },
    );
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

const getFreifaecherAdmin = async (req, res) => {
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
         voraussetzungen, 
         icon, 
         gewichtung
  from freifach_tbl
           JOIN freifach_betreut fb on freifach_tbl.f_id = fb.f_fk
           JOIN lehrer_tbl lt on lt.l_id = fb.l_fk;`,
    );

    res.status(200).json(result.rows);
  } catch {
    res.status(500).send('Fehler');
  }
};

const acceptFach = (req, res) => {
  const id = req.params.id;
  const state = String(req.body.genehmigt);

  DatenbankVerbinden();
  try {
    aktiverClient.query('UPDATE freifach_tbl SET genehmigt = $1 WHERE f_id = $2; ', [state, id]);
    res.status(200).send('Success');
  } catch (error) {}
};

const adminChangeFach = (req, res) => {
  const id = req.params.id;
  const body = req.body;

  DatenbankVerbinden();

  try {
    if (body.linkThumbnail) {
      aktiverClient.query(
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
      aktiverClient.query(
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
    res.status(200).send('Success');
  } catch (error) {
    res.status(500).send('Fehler');
  }
  DatenbankTrennen();
};

const getSchuelerFaecher = async (req, res) => {
  const id = req.query.id;

  try {
    let result = await aktiverClient.query(
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

    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
};

const accepDeclineStudent = (req, res) => {
  const { id } = req.params;
  const { status, fachID } = req.body;

  if (!id || !status) rest.status(404).send('User not found');
  try {
    DatenbankVerbinden();
    aktiverClient.query(`UPDATE freifach_bucht SET status = $1 WHERE s_fk = $2 and f_fk = $3;`, [
      status,
      id,
      fachID,
    ]);
    res.status(200).send('success');
  } catch (error) {
    console.log(error);
    res.status(500).send('error');
  }
};

const fachDel = async (req, res) => {
  const { id } = req.params;
  const { lehrerID } = req.query;

  DatenbankVerbinden();

  try {
    if (id) {
      aktiverClient.query(`DELETE FROM freifach_tbl WHERE f_id = $1;`, [id]);

      aktiverClient.query('DELETE FROM freifach_betreut WHERE l_fk = $1;', [lehrerID]);

      const result = await aktiverClient.query(
        'SELECT thumbnail from freifach_tbl where f_id = $1;',
        [id],
      );

      let thumbnailLink = result.rows[0].thumbnail;

      //change image path to /public/images/
      thumbnailLink = thumbnailLink.replace('/images/', '/public/images/');

      //remove everything before the /public
      thumbnailLink = thumbnailLink.replace(/^.*\/public\//, '/public/');

      thumbnailLink = path.join(dirname, thumbnailLink);

      //Bild löschen
      fs.unlink(thumbnailLink, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('File deleted!');
        }
      });

      //Status 200 schicken
      res.status(200).send('success');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('error');
  }
};

const getFreifaecherLehrer = (req, res) => {
  //Freifach über query bekommen
  const { freifachname } = req.query;
  console.log(`Name: ${freifachname}`);

  //Datenbankverbinden
  DatenbankVerbinden();

  //Lehrerdaten bekommen
  aktiverClient.query(
    `SELECT lt.vorname, lt.nachname, lt.email, lt.icon
    FROM freifach_tbl
    INNER JOIN freifach_betreut fb on freifach_tbl.f_id = fb.f_fk
    INNER JOIN lehrer_tbl lt on lt.l_id = fb.l_fk
    WHERE titel = $1`,
    [freifachname],
    (err, result) => {
      if (!err) {
        let LehrerGefunden = result.rows[0];

        //Feedback vom Server
        res.status(200).json(LehrerGefunden);
      } else {
        res
          //Feedback vom Server
          .status(210)
          .send(
            'Leider ist beim bekommen des Lehrers über ein Freifach ein Fehler aufgetreten (Funktion: getFreifaecherLehrer',
          );
      }
    },
  );
};

const SchuelerInFreifachAnmelden = (req, res) => {
  //Variablen bekommen
  const { s_id, f_id } = req.body;

  //Mit Datenbank verbinden
  DatenbankVerbinden();

  //Schüler ins Freifach eintragen
  aktiverClient.query(
    'INSERT INTO freifach_bucht (f_fk, s_fk) VALUES ($1, $2)',
    [f_id, s_id],
    (AnemeldenError) => {
      if (!AnemeldenError) {
        res.status(200).send('Schüler Erfolgreich ins Freifach angemeldet!');
      } else {
        res
          .status(210)
          .send(
            'Fehler beim Anmelden des Schülers ins Freifach --> Funktion: SchuelerInFreifachAnmelden',
          );
      }
    },
  );
};

const SchuelerInFreifachAbmelden = (req, res) => {
  //Variablen bekommen
  const { s_id, f_id } = req.body;

  //Mit Datenbank verbinden
  DatenbankVerbinden();

  //Schüler ins Freifach eintragen
  aktiverClient.query(
    'DELETE FROM freifach_bucht WHERE f_fk = $1 AND s_fk = $2;',
    [f_id, s_id],
    (AnemeldenError) => {
      if (!AnemeldenError) {
        res.status(200).send('Schüler Erfolgreich beim Freifach abgemeldet!');
      } else {
        res
          .status(210)
          .send(
            'Fehler beim Abemlden des Schülers vom Freifach --> Funktion: SchuelerInFreifachAbmelden',
          );
      }
    },
  );
};

const getFaecherSchueler = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const result = await aktiverClient.query(
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
      [id],
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send('Error');
  }
};

const schuelerAbmelden = (req, res) => {
  const { id } = req.params;
  DatenbankVerbinden();

  try {
    aktiverClient.query(`DELETE FROM freifach_bucht WHERE f_fk = ${id};`);
    res.status(200).send('User Deleted');
  } catch (error) {
    res.status(500).send('Error');
  }

  DatenbankTrennen();
};

const changeTimeLine = (req, res) => {
  const daten = req.body;

  console.log(daten.datum, daten.icon, daten.iconbackground);

  try {
    DatenbankVerbinden();

    //Timeline aendern
    aktiverClient.query(
      'UPDATE admintimeline_tbl SET data = $1, icon = $2, iconbackground = $3 WHERE t_id = 3;',
      [daten.datum, daten.icon, daten.iconbackground],
    );

    DatenbankTrennen();

    res.status(200).send('Success');
  } catch (error) {
    res.status(500).send('Error');
  }
};

const getFaecherFromStudent = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  DatenbankVerbinden();

  try {
    const result = await aktiverClient.query(
      'SELECT titel, vorname, nachname from freifach_tbl JOIN freifach_bucht fb on freifach_tbl.f_id = fb.f_fk JOIN schueler_tbl st on st.s_id = fb.s_fk WHERE s_id = $1;',
      [id],
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send('Error');
  }

  DatenbankTrennen();
};

export {
  fachErstellen,
  fachThumbnail,
  getAdminTimeLine,
  setFristenChangeTimeLine,
  getFristen,
  getFreifaecher,
  lehrerSchülerAnmelden,
  getFreifaecherAdmin,
  acceptFach,
  adminChangeFach,
  getSchuelerFaecher,
  accepDeclineStudent,
  fachDel,
  getFreifaecherLehrer,
  SchuelerInFreifachAnmelden,
  SchuelerInFreifachAbmelden,
  getFaecherSchueler,
  schuelerAbmelden,
  changeTimeLine,
  getFaecherFromStudent,
};
