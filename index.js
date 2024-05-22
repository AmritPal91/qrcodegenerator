import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import qr from "qr-image";
import fs from "fs";
import bodyParser from "body-parser";
import 'dotenv/config';

const _dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

var urlName = "";

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(_dirname + "/public/index.htm");
});

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/submit', (req, res, next) => {
    urlName = req.body['input_text'];
    console.log(urlName);
    var code = qr.image(urlName);
    code.pipe(fs.createWriteStream('./public/images/qr-image.png'));
    res.redirect('/')
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})
