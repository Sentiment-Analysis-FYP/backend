import {Request, Response} from "express";
import {ScrapeParameters} from "../utils";

export const scrape = async (req: Request, res: Response) => {
    try {
        const scrapeParams: ScrapeParameters = req.body
        console.log(scrapeParams)


        return res.status(200).send()
    } catch (error) {
        return res.status(500).send()
    }
}