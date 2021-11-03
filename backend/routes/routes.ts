import * as express from 'express';
import Logger from '../common/logger';
import demoRouter from './demo';

class Routes {

    public express: express.Application;
    public logger: Logger;

    constructor() {
        this.express = express();
        this.logger = new Logger();

        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use("/demo", demoRouter);

        this.express.use('/test', (req,res,next) => {
            res.send("<h2>Everything looks great</h2>");
        });
    }
}

export default new Routes().express;