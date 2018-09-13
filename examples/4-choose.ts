import * as express from "express";
import { run } from "../src/web";
import { pipe, choose } from "../src/webPart";
import { OK, NOT_FOUND } from "../src/writers";
import { GET, POST, path, request } from "../src/filters";
import { HttpContext } from "../src/web";

const server = express();
server.listen(3000, () => console.log("running 4-choose.ts"));

//choose uses the first WebPart to match

//respond to Post requests to /hello with 200 "posted world"
//respond to Get requests to /hello with 200 "hello ${who}" if the who query string is provided, else return 404
const app = pipe(
  // /hello route
  path("/hello"),
  choose(
    //Post handler
    pipe(POST, OK("posted world")),
    //Get handler
    pipe(
      GET,
      request(
        ctx =>
          ctx.req.query.who
            ? OK("hello " + ctx.req.query.who)
            : NOT_FOUND("please provide a who parameter")
      )
    )
  )
);

server.use(run(app));
