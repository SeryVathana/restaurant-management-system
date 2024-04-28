import * as bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import routes from "./routes";
import connectToDB from "./utils/db";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/", routes);

const startServer = async () => {
  await connectToDB();

  try {
    app.listen(port, () => {
      console.log(`Server is running on port : ${port}`);
    });
  } catch (err) {
    console.error("Error starting the server.", err);
  }
};

startServer();
