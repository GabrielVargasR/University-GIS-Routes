import * as express from 'express';
import * as mongoose from "mongoose";
import Logger from './common/logger';
import Routes from "./routes/routes";

class Api {

    public express: express.Application;
    private log: Logger;
    private db : any;

    constructor() {
        this.log = new Logger();
        this.express = express();
        this.connectMongoose();
        this.middleware();
        this.initRoutes();
    }

    // env variables taken from nodemon.json when runnint start:dev
    private connectMongoose() {
        const connectionURL = `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`;
        try {
          mongoose.connect(connectionURL, {
            socketTimeoutMS: 2000,
          })
          .then(() => {
            this.db = mongoose.connection;
            this.log.info("Connected to Mongo");
          })
          .catch(()=>{
            this.log.error("Error connecting to Mongo");
          });
        } catch (e) {
          this.log.error(e);
        }
      }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    private initRoutes(): void {
        this.express.use("/api", Routes);

        this.express.use('*', (req,res,next) => {
            res.send("<h2>Invalid request</h2>");
        });
    }
}

export default new Api().express;