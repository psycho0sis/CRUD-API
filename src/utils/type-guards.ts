import { ResponseUser } from '../types';

export const isDataACorrectUser = (object: unknown): object is ResponseUser => {
  return (
    Object.prototype.hasOwnProperty.call(object, 'username') &&
    Object.prototype.hasOwnProperty.call(object, 'age') &&
    Object.prototype.hasOwnProperty.call(object, 'hobbies')
  );
};
