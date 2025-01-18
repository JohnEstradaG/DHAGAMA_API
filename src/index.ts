import { environment } from "./enviroments/environment";
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import dataBaseService from "./services/data-base.service";

var bodyParser = require("body-parser");

let https = require(`https`);

class Api {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json({ limit: "500mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "500mb" }));
    this.app.use(express.static("files"));
    this.app.use(
      bodyParser.urlencoded({
        limit: "500mb",
        parameterLimit: 1000000,
        extended: false,
      })
    );
    this.app.use(
      bodyParser.json({
        limit: "500mb",
      })
    );
  }

  routes(): void {
   
  }

  start(): void {
    if (environment.production === true) {
      const httpsServer = https.createServer(environment.credentials, this.app);
      httpsServer.listen(3001);
      console.log('Server on port', '3001');
    } else {
      this.app.listen(this.app.get('port'), () => {
        console.log('Server on port', this.app.get('port'));
      });
    }
    dataBaseService.createConnections();
  }
}

const api = new Api();
api.start();
