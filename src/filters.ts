import { HttpContext } from "./web";
import { WebPart } from "./webPart";
import { Just, Nothing } from "./prelude/maybe";

export const method = (method: string): WebPart<HttpContext> => ({
  run: ctx =>
    ctx.req.method === method
      ? Promise.resolve(new Just(ctx))
      : Promise.resolve(new Nothing())
});

export const GET = method("GET");
export const PUT = method("PUT");
export const POST = method("POST");
export const DELETE = method("DELETE");
