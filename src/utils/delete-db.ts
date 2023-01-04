import path from "path";
import { unlink } from "fs/promises";


export const deleteDB = async () => {
  const pathToTheFile = path.join(process.cwd(), "db.json");
  
  try {
    await unlink(pathToTheFile);
  } catch (err) {
    console.log(err);
  }
};