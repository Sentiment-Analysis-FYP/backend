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
        // get file
        // send file to ML server
    } catch (error) {
        return res.status(500).send()
    }
}