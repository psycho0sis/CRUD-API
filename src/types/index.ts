import http from 'http';

import { routes } from "routes";

export type TKey = keyof typeof routes;

export type Request = http.IncomingMessage;

export type Response = http.ServerResponse<Request>;
