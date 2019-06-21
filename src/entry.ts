import server from './server';


server.listen(3002, () => {
  console.log(`[SERVER] Running at http://localhost:3002`);
});