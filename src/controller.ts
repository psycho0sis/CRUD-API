import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { readFile } from 'fs/promises';

import { getContentFromFile, updateDB, isDataACorrectUser } from './utils';
import { Controller, User, ResponseUser } from './types';

export const controller: Controller = {
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
  },

  async addUser(req) {
    return new Promise((resolve, reject) => {
      let body = '';

      req.on('data', data => {
        body += data;
      });

      req.on('end', async () => {
        const parsedData: unknown = JSON.parse(body);

        if (isDataACorrectUser(parsedData)) {
          const user: User = {
            id: uuidv4(),
            ...parsedData,
          };
          const content = await getContentFromFile();
          const users = content ? JSON.parse(content).concat(user) : [user];
          await updateDB(users);
          resolve();
        } else {
          reject();
        }
      });
    });
  },

  async deleteUser(id) {
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
  },

  async getUser(id) {
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
  },

  async updateUser(req, id) {
    const content = await getContentFromFile();

    return new Promise((resolve, reject) => {
      if (content) {
        let body = '';

        req.on('data', data => {
          body += data;
        });

        req.on('end', async () => {
          const parsedData: ResponseUser = JSON.parse(body);

          const user: User | undefined = JSON.parse(content).find(
            (user: User) => user.id === id,
          );

          const users: User[] = JSON.parse(content).map((user: User) => {
            if (user.id === id) {
              return { ...user, ...parsedData };
            }
            return user;
          });

          await updateDB(users);

          if (user) {
            resolve();
          }
          reject();
        });
      }
    });
  },
};
