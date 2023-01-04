import { TKey } from "types";

export const getRouter = (pathname: string | null, method: string): TKey => `${pathname}:${method.toLowerCase()}` as TKey;