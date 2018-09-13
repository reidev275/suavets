import { HttpContext } from "./web";
import { WebPart, pure, fail } from "./webPart";

export const setStatus = (code: number) => <A>(
  content: A
): WebPart<HttpContext> => ({
  run: ctx => pure({ ...ctx, res: ctx.res.status(code).send(content) })
});

export const OK = setStatus(200);
export const CREATED = setStatus(201);
export const NOT_FOUND = setStatus(404);
export const SERVER_ERROR = setStatus(500);
