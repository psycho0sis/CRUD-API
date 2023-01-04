import http from 'http';

import { user } from '../controller.js';

type Request = http.IncomingMessage;
type Response = http.ServerResponse<Request> & {
    req: Request;
};

export const routes = {
  "/api/users:get": async (req: Request, res: Response) => {
    res.writeHead(200, { "Content-Type": "application/json" });

    const users = await user.getUsers();
    res.end(JSON.stringify(users));
  },
  "default": async (req: Request, res: Response) => {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};