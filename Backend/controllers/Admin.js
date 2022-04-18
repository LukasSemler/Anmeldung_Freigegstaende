import { getFaecherAdminDB, acceptFachDB } from '../models/AdminDB.js';

const getFaecherAdmin = async (req, res) => {
  const erg = await getFaecherAdminDB();

  if (!erg) {
    res.status(500).send('Fächer konnten nicht abgefragt werden');
  } else {
    res.status(200).json(erg);
  }
};

const acceptFach = async (req, res) => {
  const { id } = req.params;
  const state = String(req.body.genehmigt);

  const erg = await acceptFachDB(id, state);

  if (erg) {
    res.status(200).send('Der Status wurde geändert');
  } else {
    res.status(500).send('Der Status wurde nicht geändert');
  }
};

export { getFaecherAdmin, acceptFach };
