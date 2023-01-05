import { Response } from '../types';
import { DEFAULT_HEADER } from './default-header';

export const handlerError = (res: Response) => {
  res.writeHead(500, DEFAULT_HEADER);
  res.write(JSON.stringify({
    message: "Internal server error"
  }));

  return res.end();
};
