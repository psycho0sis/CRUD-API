import { RoutesWithDefault, Methods } from '../types';
import { controller } from '../controller';
import {
  baseURL,
  DEFAULT_HEADER,
  RESPONSE_MESSAGES,
  STATUS_CODES,
} from '../utils';

const {
  USER_ADDED_TO_DATABASE,
  USER_WAS_DELETED,
  USER_NOT_FOUND,
  USER_NOT_VALID,
  USER_WAS_UPDATED,
  ROUTE_NOT_FOUND,
  DATA_NOT_CORRECT,
} = RESPONSE_MESSAGES;

export const getKeyForRoutes = (
  pathname: string,
  method: string,
  id?: string,
) => {
  if (baseURL === pathname && method === Methods.GET) {
    return 'GET_ALL_USERS';
  } else if (`${baseURL}/${id}` === pathname && method === Methods.GET) {
    return 'GET_ONE_USER';
  } else if (baseURL === pathname && method === Methods.POST) {
    return 'POST_NEW_USER';
  } else if (`${baseURL}/${id}` === pathname && method === Methods.DELETE) {
    return 'DELETE_USER';
  } else if (`${baseURL}/${id}` === pathname && method === Methods.PUT) {
    return 'UPDATE_USER';
  }
  return 'DEFAULT';
};

export const routes: RoutesWithDefault = {
  GET_ALL_USERS: async (req, res) => {
    const users = await controller.getUsers();

    res.writeHead(STATUS_CODES.SUCCESS, DEFAULT_HEADER);
    res.end(JSON.stringify(users));
  },
  GET_ONE_USER: async (req, res, id) => {
    try {
      const result = id && (await controller.getUser(id));

      res.writeHead(STATUS_CODES.SUCCESS, DEFAULT_HEADER);
      result && res.end(JSON.stringify(result));
    } catch {
      res.writeHead(STATUS_CODES.NOT_FOUND, DEFAULT_HEADER);
      res.end(JSON.stringify({ message: USER_NOT_FOUND }));
    }
  },
  POST_NEW_USER: async (req, res) => {
    try {
      await controller.addUser(req);
      res.writeHead(STATUS_CODES.CREATED_SUCCESS, DEFAULT_HEADER);
      res.end(JSON.stringify({ message: USER_ADDED_TO_DATABASE }));
    } catch {
      res.writeHead(STATUS_CODES.BAD_REQUEST, DEFAULT_HEADER);
      res.end(JSON.stringify({ message: DATA_NOT_CORRECT }));
    }
  },
  DELETE_USER: async (req, res, id) => {
    try {
      id && (await controller.deleteUser(id));

      res.writeHead(STATUS_CODES.NO_CONTENT, DEFAULT_HEADER);
      res.end(JSON.stringify({ message: USER_WAS_DELETED }));
    } catch {
      res.writeHead(STATUS_CODES.NOT_FOUND, DEFAULT_HEADER);
      res.end(JSON.stringify({ message: USER_NOT_FOUND }));
    }
  },
  UPDATE_USER: async (req, res, id) => {
    try {
      id && (await controller.updateUser(req, id));

      res.writeHead(STATUS_CODES.SUCCESS, DEFAULT_HEADER);
      res.end(JSON.stringify({ message: USER_WAS_UPDATED }));
    } catch {
      res.writeHead(STATUS_CODES.NOT_FOUND, DEFAULT_HEADER);
      res.end(JSON.stringify({ message: USER_NOT_FOUND }));
    }
  },
  DEFAULT: (req, res) => {
    res.writeHead(STATUS_CODES.NOT_FOUND, DEFAULT_HEADER);
    res.end(JSON.stringify({ message: ROUTE_NOT_FOUND }));
  },
};
