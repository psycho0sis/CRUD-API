import { Response } from '../types/index.js';
import { DEFAULT_HEADER } from './default-header.js';

export const handlerError = (res: Response) => {
  res.writeHead(500, DEFAULT_HEADER);
  res.write(JSON.stringify({
    message: "Internal server error"
  }));

  return res.end();
};
