import "reflect-metadata"

import {Request, Response} from "express"
import {dataSource} from "./data-source"
import authRoutes from './routes/auth.routes'
import bodyParser from "body-parser"
import cors from 'cors'
import mlRoutes from "./routes/ml.routes";
import scrapeRoutes from "./routes/scrape.routes";

const express = require('express')
const fileUpload = require('express-fileupload')

require('dotenv').config()


dataSource
    .initialize()
    .then(() => {
        console.log("Data Source initialized")
    }).catch((error) => {
    console.error("Error during Data Source initialization:\t", error)
})


export const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload())

const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
    res.send('Sentiment Analysis FYP Server')
});

// routes
app.use('/auth', authRoutes)
app.use('/ml', mlRoutes)
app.use('/scrape', scrapeRoutes)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
});