import express, { ErrorRequestHandler } from 'express';
import * as http from 'http';
import router from '../routes/index';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.use('/api', router);

// Función de error de TypeScript Express
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`HUBO UN ERROR ${err}`);
  res.status(500).json({
    err: err.message,
  });
};

app.use(errorHandler);

const myServer = new http.Server(app);

myServer.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

export default myServer;
