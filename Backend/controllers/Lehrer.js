/* eslint-disable import/extensions */
import {
  getFreifaecherLehrerDB,
  accepDeclineStudentDB,
  getSchuelerFaecherDB,
} from '../models/LehrerDB.js';

const getFreifaecherLehrer = async (req, res) => {
  const { freifachname } = req.query;

  const result = await getFreifaecherLehrerDB(freifachname);

  if (!result) {
    res.status(500).send('Es ist ein Fehler aufgetreten beim holen der Lehrer Fächer');
  } else {
    res.status(200).json(result);
  }
};

const accepDeclineStudent = async (req, res) => {
  const { id } = req.params;
  const { status, fachID } = req.body;

  if (id && status && fachID) {
    if (await accepDeclineStudentDB(id, status, fachID)) {
      res.status(200).send('Schüler wurde erfolgreich angenommen oder abgelehnt');
    } else {
      res.status(500).send('Es gab einen Fehler beim annehmen oder ablehnen von Schülern');
    }
  } else {
    res.status(404).send('User not found');
  }
};

const getSchuelerFaecher = async (req, res) => {
  const { id } = req.query;

  const result = await getSchuelerFaecherDB(id);
;

  if (!result) res.status(500).send('Es gab einen Fehler beim holen der Schüler Fächer');
  else res.status(200).json(result);
};

export { getFreifaecherLehrer, accepDeclineStudent, getSchuelerFaecher };
