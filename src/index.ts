import {Request, Response} from "express"
import {dataSource} from "./data-source"
import authRouter from './routes/auth.routes'
import bodyParser from "body-parser"
import cors from 'cors'

const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

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

const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
    res.send('Sentiment Analysis FYP Server')
});

// routes
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
});