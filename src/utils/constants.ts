export const DEFAULT_HEADER = { 'Content-Type': 'application/json' };

export const baseURL = '/api/users';

export const ERRORS = {
  NO_DATABASE_MESSAGE: 'There is no dataBase was created',
};

export const RESPONSE_MESSAGES = {
  USER_ADDED_TO_DATABASE: 'User added to database',
  INTERVAL_SERVER_ERROR: 'Internal server error',
  USER_WAS_DELETED: 'User was deleted',
  USER_NOT_FOUND: 'User not found',
  USER_NOT_VALID: 'UserId is not valid (not uuid)',
  USER_WAS_UPDATED: 'User was updated',
  ROUTE_NOT_FOUND: 'Route not found',
  DATA_NOT_CORRECT: 'Request body does not contain required fields',
};

export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED_SUCCESS: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
