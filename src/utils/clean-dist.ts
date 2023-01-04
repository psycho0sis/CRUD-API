import path from 'path';
import { rm } from 'fs/promises';

const cleanDist = async () => {
  const pathToTheFile = path.resolve(process.cwd(), './build');

  try {
    await rm(pathToTheFile, { recursive: true });
  } catch (err) {
    console.error(err);
  }
};

await cleanDist();