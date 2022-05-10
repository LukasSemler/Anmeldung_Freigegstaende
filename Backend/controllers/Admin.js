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
  console.log('Accept Fach');
  const { id } = req.params;
  const state = String(req.body.genehmigt);

  console.log(id, state);

  const erg = await acceptFachDB(id, state);

  if (erg) {
    res.status(200).json(erg);
  } else {
    res.status(500).send('Der Status wurde nicht geändert');
  }
};

export { getFaecherAdmin, acceptFach };
