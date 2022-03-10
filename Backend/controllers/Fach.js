import path from 'path';
import fs from 'fs';
import postgres from 'pg';

//Postgres Pool erstellen
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

const dirname = path.resolve();

const fachErstellen = async (req, res) => {
  //Datenbank Verbindung herstellen
  DatenbankVerbinden();

  const result = await aktiverClient.query('');
};

const fachThumbnail = (req, res) => {
  try {
    const titel = req.body.titel;
    const uniqueImageName = path.join(dirname, `\\public\\images\\${titel}.jpg`);
    fs.writeFileSync(`${uniqueImageName}`, req.files.image.data);

    res.status(200).send('Success');
  } catch {
    res.status(400).send('Something went wrong');
  }
};

const getAdminTimeLine = async (req, res) => {
  DatenbankVerbinden();

  const result = await aktiverClient.query('SELECT * FROM admintimeline_tbl; ');
  console.log(result.rows);

  res.status(200).json(result.rows);
};

export { fachErstellen, fachThumbnail, getAdminTimeLine };
