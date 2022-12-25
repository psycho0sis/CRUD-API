import { rm } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const remove = async () => {
  const pathToTheFile = path.resolve(process.cwd(), './build');

  try {
    await rm(pathToTheFile, { recursive: true });
  } catch (err) {
    console.error(err);
  }
};

await remove();
