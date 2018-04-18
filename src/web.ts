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
) => {
  const maybe = await wp.run({ req, res });
  maybe.match(() => next(), ctx => res.end());
};
