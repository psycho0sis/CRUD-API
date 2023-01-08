import http from 'http';

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

type RoutesKeys = "GET_ALL_USERS" | "GET_ONE_USER" | "POST_NEW_USER" | "DELETE_USER";
  
type Routes = {
  [key in RoutesKeys]: (req: Request, res: Response, id?: string) => Promise<void>;
};

type Default = {
  DEFAULT: (req: Request, res: Response) => void
}

export type RoutesWithDefault = Routes & Default;

export const enum Methods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

export const enum STATUS_CODES {
  SUCCESS = 200,
  CREATED_SUCCESS = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}