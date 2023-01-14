import { STATUS_CODES, RoutesWithDefault, Methods } from '../types';
import { user } from '../controller';
import {
  baseURL,
  DEFAULT_HEADER,
  RESPONSE_MESSAGES,
  uuidValidation,
} from '../utils';

const {
  USER_ADDED_TO_DATABASE,
  USER_WAS_DELETED,
  USER_NOT_FOUND,
  USER_NOT_VALID,
  USER_WAS_UPDATED,
  ROUTE_NOT_FOUND,
} = RESPONSE_MESSAGES;

export const getKeyForRoutes = (pathname: string, method: string, id?: string) => {
  if (baseURL === pathname && method === Methods.GET) {
    return 'GET_ALL_USERS';
  } else if (`${baseURL}/${id}` === pathname && method === Methods.GET) {
    return 'GET_ONE_USER';
  } else if (baseURL === pathname && method === Methods.POST) {
    return 'POST_NEW_USER';
  } else if (`${baseURL}/${id}` === pathname && method === Methods.DELETE) {
    return 'DELETE_USER';
  } else if (`${baseURL}/${id}` === pathname && method === Methods.PUT) {
    return 'UPDATE_USER'
  }
  return "DEFAULT";
};

export const routes: RoutesWithDefault = {
  GET_ALL_USERS: async (req, res) => {
    const users = await user.getUsers();

    res.writeHead(STATUS_CODES.SUCCESS, DEFAULT_HEADER);
    res.end(JSON.stringify(users));
  },
  GET_ONE_USER: async (req, res, id) => {
    if (id && uuidValidation(id)) {
      try {
        const result = await user.getUser(id);

        res.writeHead(STATUS_CODES.SUCCESS, DEFAULT_HEADER);
        res.end(JSON.stringify(result));
      } catch {
        res.writeHead(STATUS_CODES.NOT_FOUND, DEFAULT_HEADER);
        res.end(JSON.stringify({ message: USER_NOT_FOUND }));
      }
    } else {
      res.writeHead(STATUS_CODES.BAD_REQUEST, DEFAULT_HEADER);
      res.end(JSON.stringify({ message: USER_NOT_VALID }));
    }
  },
  POST_NEW_USER: async (req, res) => {
    await user.addUser(req);

    res.writeHead(STATUS_CODES.CREATED_SUCCESS, DEFAULT_HEADER);
    res.end(JSON.stringify({ message: USER_ADDED_TO_DATABASE }));
  },
  DELETE_USER: async (req, res, id) => {
    if (id && uuidValidation(id)) {
      try {
        await user.deleteUser(id);

        res.writeHead(STATUS_CODES.NO_CONTENT, DEFAULT_HEADER);
        res.end(JSON.stringify({ message: USER_WAS_DELETED }));
      } catch {
        res.writeHead(STATUS_CODES.NOT_FOUND, DEFAULT_HEADER);
        res.end(JSON.stringify({ message: USER_NOT_FOUND }));
      }
    } else {
      res.writeHead(STATUS_CODES.BAD_REQUEST, DEFAULT_HEADER);
      res.end(JSON.stringify({ message: USER_NOT_VALID }));
    }
  },
  UPDATE_USER: async (req, res, id) => {
    if (id && uuidValidation(id)) {
      try {
        await user.updateUser(req, id);

        res.writeHead(STATUS_CODES.SUCCESS, DEFAULT_HEADER);
        res.end(JSON.stringify({ message: USER_WAS_UPDATED }));
      } catch {
        res.writeHead(STATUS_CODES.NOT_FOUND, DEFAULT_HEADER);
        res.end(JSON.stringify({ message: USER_NOT_FOUND }));
      }
    } else {
      res.writeHead(STATUS_CODES.BAD_REQUEST, DEFAULT_HEADER);
      res.end(JSON.stringify({ message: USER_NOT_VALID }));
    }
  },
  DEFAULT: (req, res) => {
    res.writeHead(STATUS_CODES.NOT_FOUND, DEFAULT_HEADER);
    res.end(JSON.stringify({ message: ROUTE_NOT_FOUND }));
  }
};
