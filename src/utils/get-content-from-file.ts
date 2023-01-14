import path from 'path';
import { readFile } from 'fs/promises';

export const getContentFromFile = async () => {
  const pathToTheFile = path.resolve(process.cwd(), './db.json');
  try {
    return await readFile(pathToTheFile, {
      encoding: 'utf8',
      flag: 'a+',
    });
  } catch (err) {
    console.error(err);
  }
};
