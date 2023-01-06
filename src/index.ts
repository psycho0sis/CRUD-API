import * as dotenv from 'dotenv';
import http from 'http';
import { parse } from 'url';
import process from "process";

import { getRouter } from './utils/get-router';
import { deleteDB } from './utils/delete-db';
import { routes } from './routes';
import { TKey } from './types';
import { handlerError } from './utils/handle-server-error';

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  if (url && method) {
    const { pathname } = parse(url, true);
    const key: TKey = getRouter(pathname, method);

    const currentRout = routes[key] || routes.default;

    Promise.resolve(currentRout(req, res)).catch(() => handlerError(res));
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