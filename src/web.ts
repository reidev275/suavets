import * as Express from "express";
import { WebPart } from "./webPart";

export interface HttpContext {
  req: Express.Request;
  res: Express.Response;
}

export const run = (wp: WebPart<HttpContext>) => async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) =>
  wp
    .run({ req, res })
    .then(maybe => maybe.match(() => next(), ctx => res.end()))
    .catch(ex => res.status(500).send(ex));
