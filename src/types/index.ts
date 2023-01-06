import http from 'http';

import { routes } from 'routes';

export type TKey = keyof typeof routes;

export type Request = http.IncomingMessage;

export type Response = http.ServerResponse<Request>;

export type ResponseUser = {
  username: string;
  age: number;
  hobbies: string[];
};

export type User = ResponseUser & {
  id: string;
};

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