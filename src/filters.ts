import { HttpContext } from "./web";
import { WebPart, pure, fail } from "./webPart";

export const method = (method: string): WebPart<HttpContext> => ({
  run: ctx => (ctx.req.method === method ? pure(ctx) : fail<HttpContext>())
});

export const GET = method("GET");
export const PUT = method("PUT");
export const POST = method("POST");
export const DELETE = method("DELETE");

export const path = (path: string): WebPart<HttpContext> => ({
  run: ctx => (ctx.req.path === path ? pure(ctx) : fail<HttpContext>())
});
