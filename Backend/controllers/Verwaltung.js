/* eslint-disable import/extensions */
import { createRequire } from 'module';
import { query } from '../DB/index.js';

import {
  setFristenChangeTimeLineDB,
  getAdminTimeLineDB,
  getFristenDB,
  getFaecherFromStudentDB,
} from '../models/VerwaltungDB.js';

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
  // if (!GoogleUser.email.includes('@htlwienwest.at')) {
  //   res.status(210).send('Du bist leider kein Mitglied der HTL WienWest!');
  //   return;
  // }

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

  if (GoogleUser.isLehrer) {
    // Ist ein Lehrer
    let isLehrerSchonEingetragen = await query('SELECT email FROM lehrer_tbl WHERE email = $1', [
      GoogleUser.email,
    ]);

    // Schauen ob Schüler schon mal verbunden war
    if (isLehrerSchonEingetragen.rowCount == 0) {
      // Wenn der Schüler noch nicht in der Datenbank ist
      let LehrerEintragen = await query(
        'INSERT INTO lehrer_tbl (vorname, nachname, email, icon) VALUES ($1, $2, $3, $4) RETURNING *',
        [
          GoogleUser.name.split(' ')[0],
          GoogleUser.name.split(' ')[1],
          GoogleUser.email,
          GoogleUser.icon,
        ],
      );

      // Lehrer nach Eintrag zurückgeben
      if (LehrerEintragen.rows[0]) {
        let lehrer = LehrerEintragen.rows[0];
        lehrer.isLehrer = true;

        //Express Session setzen
        req.session.aktiverUser = lehrer;

        //Server-Feedback
        res.status(200).json(lehrer);
      } else {
        // Server-Result setzen
        res.status(210).send('Fehler beim Eintragen & ausgeben des Lehrers');
      }
    }
    // Wenn der Schüler in der Datenbank gefunden wurde diesen Zurückgeben
    else {
      let LehrerGesucht = await query('SELECT * FROM lehrer_tbl WHERE email = $1', [
        GoogleUser.email,
      ]);

      if (LehrerGesucht.rows[0]) {
        const lehrer = LehrerGesucht.rows[0];
        lehrer.isLehrer = true;

        //Express Session setzen
        req.session.aktiverUser = lehrer;

        //Server-Feedback
        res.status(200).json(lehrer);
      } else {
        // Server-Result setzen
        res.status(210).send('Fehler beim Ausgeben des vorhandenen Users');
      }
    }
  } else {
    // Ist ein Schüler
    let isSchuelerchonEingetragen = await query('SELECT email FROM schueler_tbl WHERE email = $1', [
      GoogleUser.email,
    ]);

    // Schauen ob Schüler schon mal verbunden war
    if (isSchuelerchonEingetragen.rowCount == 0) {
      // Wenn der Schüler noch nicht in der Datenbank ist
      let SchuelerEintragen = await query(
        'INSERT INTO schueler_tbl (vorname, nachname, email, klasse, icon) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [
          GoogleUser.name.split(' ')[0],
          GoogleUser.name.split(' ')[1],
          GoogleUser.email,
          GoogleUser.klasse,
          GoogleUser.icon,
        ],
      );

      // Schüler nach Eintrag zurückgeben
      if (SchuelerEintragen.rows[0]) {
        let Schueler = SchuelerEintragen.rows[0];
        Schueler.isLehrer = false;
        Schueler.isAdmin = false;

        //Express Session setzen
        req.session.aktiverUser = Schueler;

        //Server-Feedback
        res.status(200).json(Schueler);
      } else {
        console.log(errorEintrag);
        // Server-Result setzen
        res.status(210).send('Fehler beim Eintragen & ausgeben des Schülers');
      }
    }
    // Wenn der Schüler in der Datenbank gefunden wurde diesen Zurückgeben
    else {
      let SchuelerGesucht = await query('SELECT * FROM schueler_tbl WHERE email = $1', [
        GoogleUser.email,
      ]);

      if (SchuelerGesucht.rows[0]) {
        const Schueler = SchuelerGesucht.rows[0];
        Schueler.isAdmin = false;
        Schueler.isLehrer = false;

        //Express Session setzen
        req.session.aktiverUser = Schueler;

        //Server-Feedback
        res.status(200).json(Schueler);
      } else {
        // Server-Result setzen
        res.status(210).send('Fehler beim Ausgeben des vorhandenen Users');
      }
    }
  }
};

const lehrerSchülerAbmelden = (req, res) => {
  try {
    req.session.destroy();
    res.status(200).send('Erfolgreich abgemeldet');
  } catch {
    res.status(210).send('Fehler beim Abmelden');
  }
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
  lehrerSchülerAbmelden,
  getFaecherFromStudent,
};
