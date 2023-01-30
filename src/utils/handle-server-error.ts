import { Response } from '../types';

import { DEFAULT_HEADER, RESPONSE_MESSAGES } from './constants';

export const handlerError = (res: Response) => {
  res.writeHead(500, DEFAULT_HEADER);
  res.write(
    JSON.stringify({
      message: RESPONSE_MESSAGES.INTERVAL_SERVER_ERROR,
    }),
  );

  return res.end();
};
