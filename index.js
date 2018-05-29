import express from 'express';
import bodyParser from "body-parser";
import routes from './routes'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/v1", routes)


var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});