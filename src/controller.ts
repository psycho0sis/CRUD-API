import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { readFile } from 'fs/promises';

import { Request, User, ResponseUser } from './types';
import { updateDB } from './utils/update-db';

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
      const user: User = { id: uuidv4(), ...parsedData };
      await updateDB(user);
    });
  }

  // async getUser(id: number) {
  //   const pathToTheFile = path.resolve(process.cwd(), "./db.json");
  //   const content = JSON.parse(await readFile(pathToTheFile, { encoding: "utf8", flag: "a+" }));

  //   return new Promise((resolve, reject) => {
  //     const user = content && content.find((user: User) => user.id === id);
  //     if (user) {
  //       resolve(user);
  //     } else {
  //       reject(`Todo with id ${id} not found `);
  //     }
  //   });
  // }

  // async updateUser(id: number) {
  //   return new Promise((resolve, reject) => {
  //     const todo = data.find((user) => todo.id === parseInt(id));
  //     if (!user) {
  //       reject(`No user with id ${id} found`);
  //     }
  //     todo["completed"] = true;
  //     resolve(todo);
  //   });
  // }

  //   async deleteUser(id: number){
  //     return new Promise((resolve, reject) => {

  //       const todo = data.find((user) => todo.id === parseInt(id));
  //       if (!todo) {
  //         reject(`No todo with id ${id} found`);
  //       }
  //       resolve(`Todo deleted successfully`);
  //     });
  //   }
}

export const user = new Controller();
