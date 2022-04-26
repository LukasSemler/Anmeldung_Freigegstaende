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

  console.log(body);

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

    if (
      await fachErstellenDB(
        titel,
        beschreibung,
        linkThumbnail,
        selected,
        numberMin,
        numberMax,
        voraussetzungen,
        lehrer,
      )
    ) {
      res.status(200).send('Fach wurde erfolgreich eingefügt');
    } else {
      res.status(500).send('Es ist ein Fehler beim einfügen des Fachs aufgetreten');
    }
  }
};

//! Thumbnail vom Fach speichern
const fachThumbnailSpeichern = async (req, res) => {
  console.log('Fach bekommen');
  try {
    const { titel, datentyp } = req.body;
    console.log(titel, datentyp);
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
    if (await fachLöschenDB(id, lehrerID)) {
      try {
        const result = await fachThumbnailEntfernen(id);
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
        res.status(200).send('Fach wurde erfolgreich gelöscht');
      } catch (error) {
        //Fehler ausgeben
        console.log(error.message);
        //Fehler zurückschicken
        res.status(500).send('Fehler beim Thumbnail löschen');
      }
      console.log('Success beim löschen des Fachs');
    } else {
      res.status(500).send('Es ist ein Fehler beim löschen des Fachs aufgetreten');
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
