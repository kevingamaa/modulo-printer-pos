// node-typescript/src/server.ts
import  express =  require('express');


const server: express.Application = express();

server.get("/", (_, res) => {
  res.send("Hello ts-node!");
});

export default server;