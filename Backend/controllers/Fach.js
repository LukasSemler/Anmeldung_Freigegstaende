/* eslint-disable import/extensions */
import {
  fachErstellenDB,
  fachLöschenDB,
  fachThumbnailEntfernen,
  getFreifaecherDB,
  changeFachDB,
} from '../models/FachDB.js';

import fs from 'fs';
import path from 'path';

const dirname = path.resolve();

//! Fach erstellen
const fachErstellen = async (req, res) => {
  console.log('Die Route wurde aufgerufen');
  const body = req.body;

  if (!body) {
    res.status(500).send('Keine Daten im Body bekommen');
  } else {
    const {
      titel,
      beschreibung,
      linkThumbnail,
      selected,
      numberMin,
      numberMax,
      voraussetzungen,
      lehrer,
    } = body;

    let result = await fachErstellenDB(
      titel,
      beschreibung,
      linkThumbnail,
      selected,
      numberMin,
      numberMax,
      voraussetzungen,
      lehrer,
    );

    console.log(result);

    if (result) {
      return res.status(200).send('Fach wurde erfolgreich eingefügt');
    } else if (result == null) {
      return res.status(409).send('Fach existiert bereits');
    } else {
      return res.status(500).send('Es ist ein Fehler beim einfügen des Fachs aufgetreten');
    }
  }
};

//! Thumbnail vom Fach speichern
const fachThumbnailSpeichern = async (req, res) => {
  try {
    const { titel, datentyp } = req.body;

    console.log('Titel: ' + titel, '| Datentyp: ' + datentyp);

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

//! Fach löschen
const fachDel = async (req, res) => {
  const { id } = req.params;
  const { lehrerID } = req.query;

  if (id && lehrerID) {
    const resultThumbnail = await fachThumbnailEntfernen(id);
    console.log('Thumbnail: ' + resultThumbnail);
    const erg = await fachLöschenDB(id, lehrerID);

    if (erg) {
      try {
        console.log('Result: ', resultThumbnail);
        let thumbnailLink = resultThumbnail;
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
        return res.status(200).send('Fach wurde erfolgreich gelöscht');
      } catch (error) {
        //Fehler ausgeben
        console.log(error.message);
        //Fehler zurückschicken
        return res.status(500).send('Fehler beim Thumbnail löschen');
      }
    } else {
      return res.status(500).send('Es ist ein Fehler beim löschen des Fachs aufgetreten');
    }
  }
};

//! Fächer bekommen
const getFreifaecher = async (req, res) => {
  const { email } = req.query;

  const vorhanden = await getFreifaecherDB(email);

  if (!vorhanden) {
    res.status(500).send('Es ist ein Fehler beim bekommen der Fächer aufgetreten');
  } else {
    res.status(200).json(vorhanden);
  }
};

//! Fach ändern
const changeFach = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const erg = await changeFachDB(id, body);

  if (erg) {
    res.status(200).send('Fach wurde geändert');
  } else {
    res.status(500).send('Es ist ein Fehler beim ändern des Fachs aufgetreten');
  }
};
export { fachErstellen, fachThumbnailSpeichern, fachDel, getFreifaecher, changeFach };
