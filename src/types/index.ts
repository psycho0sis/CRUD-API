import http from 'http';

import { RESPONSE_MESSAGES, STATUS_CODES } from '../utils';
import { routes } from '../routes';

export type TKey = keyof typeof routes;

export type Request = http.IncomingMessage;

export type Response = http.ServerResponse<Request> & {
  req: http.IncomingMessage;
};

export type ResponseUser = {
  username: string;
  age: number;
  hobbies: string[];
};

export type User = ResponseUser & {
  id: string;
};

type RoutesKeys =
  | 'GET_ALL_USERS'
  | 'GET_ONE_USER'
  | 'POST_NEW_USER'
  | 'DELETE_USER'
  | 'UPDATE_USER';

type Routes = {
  [key in RoutesKeys]: (
    req: Request,
    res: Response,
    id?: string,
  ) => Promise<void>;
};

type Default = {
  DEFAULT: (req: Request, res: Response) => void;
};

export type RoutesWithDefault = Routes & Default;

export const enum Methods {
  DELETE = 'DELETE',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

export type Message = keyof typeof RESPONSE_MESSAGES;

export type StatusCodeKeys = keyof typeof STATUS_CODES;

export type StatusCode = (typeof STATUS_CODES)[StatusCodeKeys];

export interface Controller {
  getUsers(): Promise<User>;
  addUser(req: Request): Promise<void>;
  deleteUser(id: string): Promise<User[] | undefined>;
  getUser(id: string): Promise<User | undefined>;
  updateUser(req: Request, id: string): Promise<void>;
}
