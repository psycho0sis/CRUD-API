import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { readFile } from 'fs/promises';

import { getContentFromFile, updateDB } from './utils';
import { Request, User, ResponseUser } from './types';

class Controller {
  async getUsers() {
    const pathToTheFile = path.resolve(process.cwd(), './db.json');
    const content = await readFile(pathToTheFile, {
      encoding: 'utf8',
      flag: 'a+',
    });

    try {
      if (!content) {
        return [];
      } else {
        return JSON.parse(content);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async addUser(req: Request) {
    let body = '';

    req.on('data', data => {
      body += data;
    });

    req.on('end', async () => {
      const parsedData: ResponseUser = JSON.parse(body);

      const user: User = {
        id: uuidv4(),
        ...parsedData,
      };
      const content = await getContentFromFile();
      const users = content ? JSON.parse(content).concat(user) : [user];
      await updateDB(users);
    });
  }

  async deleteUser(id: string) {
    const content = await getContentFromFile();

    if (content) {
      const isUserExist = JSON.parse(content).find(
        (user: User) => user.id === id,
      );
      const users: User[] = JSON.parse(content).filter(
        (user: User) => user.id !== id,
      );
      await updateDB(users);

      return new Promise((resolve, reject) => {
        if (isUserExist) {
          resolve(users);
        } else {
          reject(users);
        }
      });
    }
  }

  async getUser(id: string) {
    const content = await getContentFromFile();

    if (content) {
      const user: User = JSON.parse(content).find(
        (user: User) => user.id === id,
      );

      return new Promise((resolve, reject) => {
        if (user) {
          resolve(user);
          return user;
        } else {
          reject(user);
        }
      });
    }
  }

  async updateUser(req: Request, id: string) {
    return new Promise(async (resolve, reject) => {
      const content = await getContentFromFile();

      if (content) {
        let body = '';

        req.on('data', data => {
          body += data;
        });

        let users: User[] = [];
        let user: User | undefined = undefined;

        req.on('end', async () => {
          const parsedData: ResponseUser = JSON.parse(body);

          user = JSON.parse(content).find((user: User) => user.id === id);

          users = JSON.parse(content).map((user: User) => {
            if (user.id === id) {
              return { ...user, ...parsedData };
            }
            return user;
          });

          await updateDB(users);

          if (user) {
            resolve(users);
          }
          reject(users);
        });
      }
    });
  }
}

export const user = new Controller();
