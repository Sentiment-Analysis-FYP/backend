import {Request, Response} from "express";
import {dataSource} from "./data-source";

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source initialized")
    }).catch((error) => {
    console.error("Error during Data Source initialization:\t", error)
})

const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Sentiment Analysis FYP Server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});