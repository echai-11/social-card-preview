import express from "express";
import getData from "./utils/scrape.js";
import cors from "cors";
import path from "path";

const app = express();
const port = 3000;

app.use(express.urlencoded(true));

app.use(express.json());

app.use(cors());

app.use(express.static(path.resolve('./client/build')));

app.post('/url', (req, res) => {
    let data;
    if (req.body && req.body.url){
      data = getData(req.body.url, res);
    } else {
      res.end(401);
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})