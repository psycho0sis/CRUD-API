import path from 'path';
import { writeFile, readFile } from 'fs/promises';

import { User } from '../types';

export const updateDB = async (parsedData: User) => {
  const pathToTheFile = path.resolve(process.cwd(), './db.json');

  try {
    const content = await readFile(pathToTheFile, {
      encoding: 'utf8',
      flag: 'a+',
    });

    const users: User[] = (
      content ? JSON.parse(content).concat(parsedData) : [parsedData]
    );
      
    const promise = writeFile(pathToTheFile, JSON.stringify(users));

    await promise;
  } catch (err) {
    console.error(err);
  }
};
