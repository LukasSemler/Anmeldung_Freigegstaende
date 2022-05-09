import {
  SchuelerInFreifachAnmeldenDB,
  SchueleVonFreifachAbmeldenDB,
  getFaecherSchuelerDB,
} from '../models/SchuelerDB.js';

import colors from 'colors';

//! Schüler in Freifach anmmelden
const SchuelerInFreifachAnmelden = async (req, res) => {
  // Variablen bekommen
  const { s_id, f_id } = req.body;

  const result = await SchuelerInFreifachAnmeldenDB(s_id, f_id);

  if (result) {
    if (result == 'toMuch') res.status(210).send('Du besuchst schon zu viele Fächer');
    else res.status(200).send('Schüler wurde erfolgreich angemeldet');
  } else {
    res.status(400).send('Schüler konnte nicht angemeldet werden');
  }
};
//! Schüler von Freifach abmelden
const SchuelerVonFreifachAbmelden = async (req, res) => {
  //Variablen bekommen
  const { s_id, f_id } = req.body;

  if (await SchueleVonFreifachAbmeldenDB(s_id, f_id))
    res.status(200).send('Schüler wurde erfolgreich abgemeldet');
  else res.status(404).send('Schüler konnte nicht abgemeldet werden');
};

//! Fächer vom Schüler bekommen
const getFaecherSchueler = async (req, res) => {
  const { id } = req.params;

  const erg = await getFaecherSchuelerDB(id);

  if (!erg) {
    res.status(400).send('Schüler und Fächer konnten nicht abgefragt werden');
  } else {
    res.status(200).json(erg);
  }
};

export { SchuelerInFreifachAnmelden, SchuelerVonFreifachAbmelden, getFaecherSchueler };
