import { DEFAULT_HEADER } from '../utils/default-header.js';
import { user } from '../controller.js';
import { Request, Response } from '../types/index.js';

export const routes = {
  "/api/users:get": async (req: Request, res: Response) => {
    res.writeHead(200, DEFAULT_HEADER);

    const users = await user.getUsers();
    res.end(JSON.stringify(users));
  },
  "default": async (req: Request, res: Response) => {
    res.writeHead(404, DEFAULT_HEADER);
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};