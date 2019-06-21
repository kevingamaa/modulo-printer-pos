// node-typescript/src/server.ts
import  express =  require('express');
import bodyParser = require('body-parser');

import printRouter from './app/routes/router-printer';

const server = express();

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());


server.get("/", (req, res) => {
  res.send(req.body);
});


server.use('/printer',  printRouter)

export default server;