import {Request, Response} from "express";
import {dataSource} from "../data-source";
import {Scrape} from "../models/scrape";
import axios from "axios"
import FormData from "form-data"
import {sendCompletion} from "./socket.controller";

export const getCompleteAnalysis = async (req: Request, res: Response) => {
    try {
        if (!req.body.scrape_id) return res.status(400).send()
        // find the scrape and check that it is incomplete

        const scrape = await dataSource.getRepository(Scrape).findOneBy({
            id: req.body.id
        })

        const {scrape_id, data, email} = req.body
        const jsonData = JSON.stringify(data)
        console.log(req.body)
        sendCompletion(email, jsonData)

        console.log(`notice sent to ${email}`)
    } catch (error) {
        return res.status(500).send('Could not complete scrape')
    }
}

export const runAnalysis = async (req: Request, res: Response) => {
    try {
        const scrapeId = req.params.scrapeId
        const {email} = req.body
        console.log(scrapeId)

        // get file
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const uploadedFile: any = req.files.file
        console.log(uploadedFile.name)

        // send file to ML server
        const ML_SERVER = process.env.ML_SERVER
        const uploadPath = `upload/${scrapeId}`

        const formData = new FormData()
        formData.append('file', uploadedFile.data, {
            filename: `${scrapeId}.csv`,
        })

        formData.append('email', email)

        const mlResponse = await axios.post(`${ML_SERVER}/${uploadPath}`,
            formData,
            {
                ...formData.getHeaders()
            }
        )

        console.log(mlResponse.data)

        if (mlResponse.status != 200) {
            // fail
            console.log(mlResponse)
            return res.status(400).send("Failed to send")
        }

        // send status code
        return res.status(200).send()
    } catch (error) {
        return res.status(500).send(error)
    }
}