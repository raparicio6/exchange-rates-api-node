const app = require('./app');
const config = require('./config');

const port = config.common.api.port || 8080;

Promise.resolve()
  .then(async () => {
    await app.start();
    console.log(`Listening on port: ${port}`);
  })
  .catch(console.error);
// si hace falta llamar a la conection de la db
