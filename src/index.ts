import "reflect-metadata"

import {Request, Response} from "express"
import {dataSource} from "./data-source"
import authRoutes from './routes/auth.routes'
import bodyParser from "body-parser"
import cors from 'cors'
import mlRoutes from "./routes/ml.routes";
import scrapeRoutes from "./routes/scrape.routes";
import * as http from "http";
import WebSocket from "ws";

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
app.use(bodyParser.json({limit: '50mb'}))
app.use(fileUpload({
    limits: {
        fileSize: 50000000
    }
}))

const server = http.createServer(app)

export const socketServer = new WebSocket.Server({server})
export const socketClients = new Map<string, WebSocket>
socketServer.on('connection', (socket, request) => {
    console.log(`Socket Connection opened from ${request.socket.remoteAddress}`)

    socket.on('message', (message: string) => {
        const data = JSON.parse(message)

        socketClients.set(data.email ? data.email : "guest21", socket)
        console.log(socketClients.keys())
    })

    socket.send(JSON.stringify({isComplete: false}))
})

const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
    res.send('Sentiment Analysis FYP Server')
});

// routes
app.use('/auth', authRoutes)
app.use('/ml', mlRoutes)
app.use('/scrape', scrapeRoutes)

server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
});