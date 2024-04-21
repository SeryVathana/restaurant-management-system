import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import cors from "cors"

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173"
}))

app.use('/', routes);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
