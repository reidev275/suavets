import * as express from "express";
import { run } from "../src/web";
import { pipe } from "../src/webPart";
import { OK } from "../src/writers";
import { GET } from "../src/filters";

const server = express();
server.listen(3000, () => console.log("running 1-ok.ts"));

//respond to Get requests with 200 "hello world"
const app = pipe([GET, OK("hello world")]);

server.use(run(app));
