import { parse } from 'url';

import { Request, Response, Methods, STATUS_CODES } from '../types';
import { user } from '../controller';
import {
  baseURL,
  DEFAULT_HEADER,
  RESPONSE_MESSAGES,
  uuidValidation,
} from '../utils';

export const routes = async (req: Request, res: Response) => {
  const { url, method } = req;
  const {
    USER_ADDED_TO_DATABASE,
    USER_WAS_DELETED,
    USER_NOT_FOUND,
    USER_NOT_VALID,
    ROUTE_NOT_FOUND,
  } = RESPONSE_MESSAGES;

  if (url && method) {
    const { pathname } = parse(url, true);
    const id = pathname?.split('/')[3];

    if (baseURL === pathname && method === Methods.GET) {
      res.writeHead(STATUS_CODES.SUCCESS, DEFAULT_HEADER);

      const users = await user.getUsers();

      res.end(JSON.stringify(users));
    } else if (baseURL === pathname && method === Methods.POST) {
      res.writeHead(STATUS_CODES.CREATED_SUCCESS, DEFAULT_HEADER);

      await user.addUser(req);

      res.end(JSON.stringify({ message: USER_ADDED_TO_DATABASE }));
    } else if (`${baseURL}/${id}` === pathname && method === Methods.DELETE) {
      if (id && uuidValidation(id)) {
        try {
          await user.deleteUser(id);
          res.writeHead(STATUS_CODES.NO_CONTENT, DEFAULT_HEADER);

          res.end(JSON.stringify({ message: USER_WAS_DELETED }));
        } catch (err) {
          console.log(err);
          res.writeHead(STATUS_CODES.NOT_FOUND, DEFAULT_HEADER);
          res.end(JSON.stringify({ message: USER_NOT_FOUND }));
        }
      } else {
        res.writeHead(STATUS_CODES.BAD_REQUEST, DEFAULT_HEADER);
        res.end(JSON.stringify({ message: USER_NOT_VALID }));
      }
    } else {
      res.writeHead(STATUS_CODES.NOT_FOUND, DEFAULT_HEADER);

      res.end(JSON.stringify({ message: ROUTE_NOT_FOUND }));
    }
  }
};
