import path from 'path';
import { unlink } from 'fs/promises';

import { ERRORS } from './constants';

export const deleteDB = async () => {
  const pathToTheFile = path.resolve(process.cwd(), './db.json');

  try {
    await unlink(pathToTheFile);
  } catch {
    console.log(ERRORS.NO_DATABASE_MESSAGE);
  }
};
