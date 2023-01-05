import path from "path";
import { readFile } from 'fs/promises';

import { __dirname} from "./constants";


class Controller {
  async getUsers() {
    const pathToTheFile = path.join(__dirname, "../db.json");

    try {
      const content = await readFile(pathToTheFile, { encoding: "utf8", flag: "a+" });
      if (!content) {
        return [];
      } else {
        return content;
      }
    } catch (err) {
      console.log(err);
    }
  }

  //   async getUser(id: number) {
  //     return new Promise((resolve, reject) => {
  //       const user = data.find((user) => user.id === parseInt(id));
  //       if (user) {
  //         resolve(user);
  //       } else {
  //         reject(`Todo with id ${id} not found `);
  //       }
  //     });
  //   }

  //   async createUser(user) {
  //     return new Promise((resolve, _) => {
  //       const newUser = {
  //         id: Math.floor(4 + Math.random() * 10),
  //         ...user,
  //       };

  //       resolve(newUser);
  //     });
  //   }
    
  //   async updateUser(id: number) {
  //     return new Promise((resolve, reject) => {
  //       const todo = data.find((user) => todo.id === parseInt(id));
  //       if (!user) {
  //         reject(`No user with id ${id} found`);
  //       }
  //       todo["completed"] = true;
  //       resolve(todo);
  //     });
  //   }

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