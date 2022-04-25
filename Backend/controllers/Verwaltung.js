/* eslint-disable import/extensions */
import { createRequire } from 'module';
import { pool } from '../DB/index.js';

import {
  setFristenChangeTimeLineDB,
  getAdminTimeLineDB,
  getFristenDB,
  getFaecherFromStudentDB,
} from '../models/VerwaltungDB.js';

const client = await pool.connect();

const require = createRequire(import.meta.url);
const WebUntis = require('webuntis');
const nodeWebuntis = require('node-webuntis');

const setFristenChangeTimeLine = async (req, res) => {
  const changeTimeLine = req.body[0];
  const setFristen = req.body[1];

  const result = await setFristenChangeTimeLineDB(changeTimeLine, setFristen);

  if (!result) res.status(500).send('Fristen konnten nicht geändert werden');
  else res.status(200).send('Fristen wurden gesetzt');
};

const getAdminTimeLine = async (req, res) => {
  const result = await getAdminTimeLineDB();

  // Schauen ob Daten vorhanden sind
  if (!result) res.status(500).send('Zeitlinie konnte nicht abgefragt werden');
  else res.status(200).json(result);
};

const getFristen = async (req, res) => {
  const result = await getFristenDB();

  // Schauen ob Daten vorhanden sind
  if (!result) res.status(500).send('Fristen konnten nicht abgefragt werden');
  else res.status(200).json(result);
};

const lehrerSchülerAnmelden = async (req, res) => {
  // Wichtige Variablen
  const GoogleUser = req.body;

  // Checken ob User, ein HTLWienwest-Mitglied ist
  if (!GoogleUser.email.includes('@htlwienwest.at')) {
    res.status(210).send('Du bist leider kein Mitglied der HTL WienWest!');
    return;
  }

  // Schülerklasse herausfinden
  const SchuelerKlasseHerausfinden = async () => {
    try {
      // AdminAccount
      const untis = new WebUntis(
        'htlwienwest',
        'proj_AFG_itp2021',
        'Benni2410$',
        'melpomene.webuntis.com',
      );
      await untis.login();
      const klassenArray = await untis.getClasses();

      // Schüleraccount
      const { klasseId } = await nodeWebuntis.getSession(
        'htlwienwest',
        GoogleUser.email.split('@')[0],
        GoogleUser.webUntisPW,
      );

      // Klasse suchen
      const SchuelerKlasse = klassenArray.find(({ id }) => klasseId === id).name;

      return SchuelerKlasse;
    } catch (error) {
      console.log(`Fehler --> ${error}`);
      return '';
    }
  };

  // Klasse vom Schüler bekommen, wenn Schüler
  if (!GoogleUser.isLehrer) {
    GoogleUser.klasse = await SchuelerKlasseHerausfinden();

    console.log(`Klasse: ${GoogleUser.klasse}`);

    if (GoogleUser.klasse === '') {
      res.status(210).send('Webuntis-Passwort war leider falsch!');
      return;
    }
  }

  //! Datenbank:
  if (GoogleUser.isLehrer) {
    // Ist ein Lehrer
    client.query(
      'SELECT email FROM lehrer_tbl WHERE email = $1',
      [GoogleUser.email],
      (error, result) => {
        if (!error) {
          // Schauen ob Lehrer schon mal verbunden war
          if (result.rowCount == 0) {
            // Wenn der Schüler noch nicht in der Datenbank ist
            client.query(
              'INSERT INTO lehrer_tbl (vorname, nachname, email, icon) VALUES ($1, $2, $3, $4)',
              [
                GoogleUser.name.split(' ')[0],
                GoogleUser.name.split(' ')[1],
                GoogleUser.email,
                GoogleUser.icon,
              ],
              (errorEintrag, resultEintrag) => {
                if (!errorEintrag) {
                  // Lehrer nach Eintrag zurückgeben
                  client.query(
                    'SELECT * FROM lehrer_tbl WHERE email = $1',
                    [GoogleUser.email],
                    (errorSuche, resultSuche) => {
                      const User = resultSuche.rows[0];
                      User.isLehrer = true;

                      // Server-Result setzen
                      res.status(200).json(User);
                    },
                  );
                } else {
                  // Server-Result setzen
                  res.status(210).send('Fehler beim Eintragen des Lehrer');
                }
              },
            );
          }
          // Wenn der Lehrer in der Datenbank gefunden wurde diesen Zurückgeben
          else {
            client.query(
              'SELECT * FROM lehrer_tbl WHERE email = $1',
              [GoogleUser.email],
              (errorSuche, resultSuche) => {
                if (!errorSuche) {
                  const User = resultSuche.rows[0];
                  User.isLehrer = true;

                  // Server-Result setzen
                  res.status(200).json(User);
                } else {
                  // Server-Result setzen
                  res.status(210).send('Fehler beim Ausgeben des vorhandenen Users');
                }
              },
            );
          }
        }
      },
    );
  } else {
    // Ist ein Schüler
    client.query(
      'SELECT email FROM schueler_tbl WHERE email = $1',
      [GoogleUser.email],
      (error, result) => {
        if (!error) {
          // Schauen ob Schüler schon mal verbunden war
          if (result.rowCount == 0) {
            // Wenn der Schüler noch nicht in der Datenbank ist
            client.query(
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
                  // Schüler nach Eintrag zurückgeben
                  client.query(
                    'SELECT * FROM schueler_tbl WHERE email = $1',
                    [GoogleUser.email],
                    (errorSuche, resultSuche) => {
                      const User = resultSuche.rows[0];
                      User.isAdmin = false;
                      User.isLehrer = false;

                      // Server-Result setzen
                      res.status(200).json(User);
                    },
                  );
                } else {
                  console.log(errorEintrag);
                  // Server-Result setzen
                  res.status(210).send('Fehler beim Eintragen des Schülers');
                }
              },
            );
          }
          // Wenn der Schüler in der Datenbank gefunden wurde diesen Zurückgeben
          else {
            client.query(
              'SELECT * FROM schueler_tbl WHERE email = $1',
              [GoogleUser.email],
              (errorSuche, resultSuche) => {
                if (!errorSuche) {
                  const User = resultSuche.rows[0];
                  User.isAdmin = false;
                  User.isLehrer = false;

                  // Server-Result setzen
                  res.status(200).json(User);
                } else {
                  // Server-Result setzen
                  res.status(210).send('Fehler beim Ausgeben des vorhandenen Users');
                }
              },
            );
          }
        }
      },
    );
  }
  // DB Conn trennen
  client.release();
};

const getFaecherFromStudent = async (req, res) => {
  const { id } = req.params;

  if (id) {
    const result = await getFaecherFromStudentDB(id);

    if (!result) res.status(500).send('Fehler beim Ausgeben der Fächer');
    else res.status(200).json(result);
  } else res.status(404).send('Keine ID');
};

export {
  setFristenChangeTimeLine,
  getAdminTimeLine,
  getFristen,
  lehrerSchülerAnmelden,
  getFaecherFromStudent,
};
