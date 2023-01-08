import * as dotenv from 'dotenv';
import http from 'http';
import process from "process";

import { deleteDB, handlerError } from './utils';
import { routes } from './routes';

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer(async (req, res) => {
  try {
    await routes(req, res);
  } catch (err) {
    handlerError(res);
  }
});

export const finishServerWork = async () => {
  await deleteDB();
  server.close();
  process.exit();
};

export const finishServerWorkForTest = async () => {
  await deleteDB();
  server.close();
};

process.on('SIGINT', async () => {
  finishServerWork();
});

process.on('SIGTSTP', async () => {
  finishServerWork();
});

server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

export {
  server
};