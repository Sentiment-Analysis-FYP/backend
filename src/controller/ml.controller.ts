import {Request, Response} from "express";
import {dataSource} from "../data-source";
import {Scrape} from "../models/scrape";

export const getCompleteAnalysis = async (req: Request, res: Response) => {
    try {
        if (!req.body.scrape_id) return res.status(400).send()
        // find the scrape and check that it is incomplete

        const scrape = await dataSource.getRepository(Scrape).findOneBy({
            id: req.body.id
        })
    } catch (error) {
        return res.status(500).send('Could not complete scrape')
    }
}

export const runAnalysis = async (req: Request, res: Response) => {
    try {
        const scrapeId = req.params.scrapeId

        // get file
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const uploadedFile = req.files.file
        console.log(uploadedFile)

        // send file to ML server

        // send status code
        return res.status(200).send()
    } catch (error) {
        return res.status(500).send(error)
    }
}