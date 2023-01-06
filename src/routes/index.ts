import { parse } from 'url';

import { baseURL, DEFAULT_HEADER } from '../utils/constants';
import { uuidValidation } from '../utils/uuid-validation';
import { Request, Response } from '../types';
import { Methods, STATUS_CODES } from '../types';
import { user } from '../controller';

export const routes = async (req: Request, res: Response) => {
  const { url, method } = req;

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

      res.end(JSON.stringify({ message: 'User added to database' }));
    } else if (`${baseURL}/${id}` === pathname && method === Methods.DELETE) {
      if (id && uuidValidation(id)) {
        try {
          await user.deleteUser(id);
          res.writeHead(STATUS_CODES.NO_CONTENT, DEFAULT_HEADER);

          res.end(JSON.stringify({ message: 'User was deleted' }));
        } catch (err) {
          console.log(err);
          res.writeHead(STATUS_CODES.NOT_FOUND, DEFAULT_HEADER);
          res.end(JSON.stringify({ message: 'User not found' }));
        }
      } else {
        res.writeHead(STATUS_CODES.BAD_REQUEST, DEFAULT_HEADER);
        res.end(JSON.stringify({ message: 'UserId is not valid (not uuid)' }));
      }
    } else {
      res.writeHead(STATUS_CODES.NOT_FOUND, DEFAULT_HEADER);

      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  }
};
