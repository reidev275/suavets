import * as express from "express";
import { run } from "../src/web";
import { pipe, choose } from "../src/webPart";
import { OK, NOT_FOUND } from "../src/writers";
import { GET, POST, path, async, request } from "../src/filters";
import { HttpContext } from "../src/web";

const server = express();
server.listen(3000, () => console.log("running 4-choose.ts"));

//choose uses the first WebPart to match

const app = pipe(
  // /hello route
  path("/hello"),
  choose(
    //handles GET requests to /hello route.  Simulates an asynchronous action and returns 200
    pipe(GET, async(ctx => wait(ctx.req.query.who, 2000).then(OK))),
    //handles POST requests to /hello route. Echoes the request body back
    pipe(POST, request(ctx => OK(ctx.req.body)))
  )
);

const wait = <A>(val: A, ms: number) =>
  new Promise((res, rej) => setTimeout(() => res(val), ms));

server.use(run(app));
