import { DEFAULT_HEADER } from '../utils/default-header';
import { user } from '../controller';
import { Request, Response } from '../types';

export const routes = {
  "/api/users:get": async (req: Request, res: Response) => {
    res.writeHead(200, DEFAULT_HEADER);

    const users = await user.getUsers();

    res.end(JSON.stringify(users));
  },
  "/api/users:post": async (req: Request, res: Response) => {
    res.writeHead(201, DEFAULT_HEADER);

    await user.addUser(req);

    res.end(JSON.stringify({ message: "User added to database" }));
  },
  "default": async (req: Request, res: Response) => {
    res.writeHead(404, DEFAULT_HEADER);

    res.end(JSON.stringify({ message: "Route not found" }));
  }
};
