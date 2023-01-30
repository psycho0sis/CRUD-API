import path from 'path';
import { writeFile } from 'fs/promises';

import { User } from '../types';

export const updateDB = async (users: User[]) => {
  const pathToTheFile = path.resolve(process.cwd(), './db.json');

  try {
    await writeFile(pathToTheFile, JSON.stringify(users));
  } catch (err) {
    console.error(err);
  }
};
