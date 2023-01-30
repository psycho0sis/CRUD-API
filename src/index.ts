import * as dotenv from 'dotenv';
import process from 'process';
import { parse } from 'url';
import http from 'http';

dotenv.config();

const PORT = process.env.PORT;

import {
  DEFAULT_HEADER,
  deleteDB,
  handlerError,
  RESPONSE_MESSAGES,
  STATUS_CODES,
  uuidValidation,
} from './utils';
import { getKeyForRoutes, routes } from './routes';
import { RoutesWithDefault } from './types';

const { USER_NOT_VALID } = RESPONSE_MESSAGES;

const server = http.createServer(async (req, res) => {
  const { url, method } = req;
  if (url && method) {
    const { pathname } = parse(url, true);
    const id = pathname?.split('/')[3];

    let key: keyof RoutesWithDefault;

    if (id) {
      if (uuidValidation(id)) {
        key = getKeyForRoutes(pathname, method, id);
      } else {
        res.writeHead(STATUS_CODES.BAD_REQUEST, DEFAULT_HEADER);
        return res.end(JSON.stringify({ message: USER_NOT_VALID }));
      }
    } else {
      key = getKeyForRoutes(pathname!, method);
    }

    const currentRout = key && routes[key];

    Promise.resolve(
      id ? currentRout(req, res, id) : currentRout(req, res),
    ).catch(() => handlerError(res));
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

export { server };
