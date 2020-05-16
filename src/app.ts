import express from 'express';
import bodyParser from 'body-parser';
import { port } from './env/env';
import { router as routes } from './routes';

const cors = require('cors');

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1.0', routes);

app.listen(port, () => {
  console.log('App listening on port 5001');
});
