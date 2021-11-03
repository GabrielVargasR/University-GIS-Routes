import * as express from "express";
import DemoController from '../controllers/demoController';

const app = express();
const demoController = new DemoController();

// middleware for development stages only
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', "*");
  next();
});


app.get("/", (req, res, next) => {
  if (req.query.name) {
    demoController.getDemo(req.query.name.toString())
    .then((book : object) =>{
        res.status(200).json({
            query: req.query.q,
            book
        })
    })
  } else {
    demoController.getDemos()
    .then((books : object)=>{
        res.status(200).json({
            query: req.query.q,
            books
        });
    })
    .catch(() => {
        res.status(400).json({
            message: "Error: Couldn't fetch articles"
        });
    })
  }
});

export default app;