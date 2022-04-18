import {
  SchuelerInFreifachAnmeldenDB,
  SchueleVonFreifachAbmeldenDB,
  getFaecherSchuelerDB,
  schuelerAbmeldenDB,
} from '../models/SchuelerDB.js';

//! Schüler in Freifach anmmelden
const SchuelerInFreifachAnmelden = async (req, res) => {
  // Variablen bekommen
  const { s_id, f_id } = req.body;

  if (await SchuelerInFreifachAnmeldenDB(s_id, f_id)) {
    res.status(200).send('Schüler wurde erfolgreich angemeldet');
  } else res.status(400).send('Schüler konnte nicht angemeldet werden');
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

const schuelerAbmelden = async (req, res) => {
  const { id } = req.params;

  // Schauen ob die ID vorhanden ist
  if (!id) res.status(404).send('Schüler konnte nicht abgemeldet werden');
  else {
    // Wenn die ID vorhanden ist, alles erledigen
    const erg = await schuelerAbmeldenDB(id);

    if (erg) {
      res.status(200).send('Schüler wurde erfolgreich abgemeldet');
    } else {
      res.status(500).send('Es gab einen Fehler beim Abmelden');
    }
  }
};

export {
  SchuelerInFreifachAnmelden,
  SchuelerVonFreifachAbmelden,
  getFaecherSchueler,
  schuelerAbmelden,
};
