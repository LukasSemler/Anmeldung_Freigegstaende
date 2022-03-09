import path from 'path';
import fs from 'fs';
const dirname = path.resolve();

const fachErstellen = (req, res) => {
  if (req.body.fachObj) {
    console.log(req.body);
  } else {
    const titel = req.body.titel;
    const uniqueImageName = path.join(dirname, `\\public\\images\\${titel}.png`);
    fs.writeFileSync(`${uniqueImageName}`, req.files.image.data);
  }
};

export { fachErstellen };
