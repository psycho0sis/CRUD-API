import * as dotenv from 'dotenv';
import process from "process";
import { parse } from 'url';
import http from 'http';

import { deleteDB, handlerError } from './utils';
import { getKeyForRoutes, routes } from './routes';

dotenv.config();

const PORT = process.env.PORT;


const server = http.createServer(async (req, res) => {
  const { url, method } = req;
  if (url && method) {
    const { pathname } = parse(url, true);
    const id = pathname?.split('/')[3];

    const key = id ? getKeyForRoutes(pathname, method, id) : getKeyForRoutes(pathname!, method) ;
  
    const currentRout = routes[key];

    Promise.resolve(id ? currentRout(req, res, id) : currentRout(req, res)).catch(() => handlerError(res));
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