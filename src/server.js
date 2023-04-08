import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import cors from 'cors'
require('dotenv').config();

let app = express();
app.use(cors({
    origin: true
}))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded(
    {
        limit: '50mb',
        extended: true
    }
))

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 9999;
// if port === undefined => port = 8000


app.listen(port, () => {
    console.log(port + " connection success !")
})