import * as express from "express";
import { run } from "../src/web";
import { pipe, choose } from "../src/webPart";
import { OK } from "../src/writers";
import { GET, POST, path } from "../src/filters";

const server = express();
server.listen(3000, () => console.log("running 4-choose.ts"));

//respond to Get requests to /hello with 200 "hello world"
//respond to Post requests to /hello with 200 "posted world"
const app = pipe(
  // /hello route
  path("/hello"),
  choose(
    //Post handler
    pipe(POST, OK("posted world")),
    //Get handler
    pipe(GET, OK("hello world"))
  )
);

server.use(run(app));
