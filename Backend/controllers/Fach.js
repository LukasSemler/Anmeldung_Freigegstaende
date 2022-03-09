import path from 'path';
import fs from 'fs';
const dirname = path.resolve();

const fachErstellen = (req, res) => {
  console.log(dirname);
  // console.log(req.files);
  const titel = req.body.titel;
  // console.table(req.files.image.data);

  const uniqueImageName = path.join(dirname, `\\public\\images\\${titel}.png`);
  fs.writeFileSync(`${uniqueImageName}`, req.files.image.data);
};

export { fachErstellen };
