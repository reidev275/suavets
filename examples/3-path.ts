import * as express from "express";
import { run } from "../src/web";
import { pipe } from "../src/webPart";
import { OK } from "../src/writers";
import { GET, path } from "../src/filters";

const server = express();
server.listen(3000, () => console.log("running 3-path.ts"));

//respond to Get requests to /hello with 200 "hello world"
const app = pipe([path("/hello"), GET, OK("hello world")]);

server.use(run(app));
