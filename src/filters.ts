import { HttpContext } from "./web";
import { WebPart, pure, fail } from "./webPart";
import { Fn } from "./prelude/common";

export const filter = (
  pred: Fn<HttpContext, boolean>
): WebPart<HttpContext> => ({
  run: ctx => (pred(ctx) ? pure(ctx) : fail<HttpContext>())
});

export const method = (method: string): WebPart<HttpContext> =>
  filter(x => x.req.method === method);

export const GET = method("GET");
export const PUT = method("PUT");
export const POST = method("POST");
export const DELETE = method("DELETE");

export const path = (path: string): WebPart<HttpContext> =>
  filter(x => x.req.path === path);

export const request = (
  fn: Fn<HttpContext, WebPart<HttpContext>>
): WebPart<HttpContext> => ({
  run: ctx => fn(ctx).run(ctx)
});

export const async = <A>(
  fn: Fn<HttpContext, Promise<WebPart<HttpContext>>>
): WebPart<HttpContext> => ({
  run: ctx => fn(ctx).then(x => x.run(ctx))
});
