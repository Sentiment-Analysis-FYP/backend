import {Request, Response} from "express";
import {ScrapeParameters} from "../utils";
import {runScrape} from "../utils/scrape/runScrape";

export const scrape = async (req: Request, res: Response) => {
    try {
        const scrapeParams: ScrapeParameters = req.body
        console.log(scrapeParams)

        const scrapedData = await runScrape(scrapeParams)
        if (!scrapedData) return res.status(501).send("Could not scrape")

        return res.status(200).send(scrapedData.data)
    } catch (error) {
        return res.status(500).send(error)
    }
}