import * as express from "express";
import { run } from "../src/web";
import { OK } from "../src/writers";

const server = express();
server.listen(3000, () => console.log("running 1-ok.ts"));

const app = OK("hello world");

server.use(run(app));
