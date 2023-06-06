import {Request, Response} from "express";

export const setScrapeComplete = (req: Request, res: Response) => {
    try {
        // find the scrape and check that it is incomplete
    } catch (error) {
        return res.status(500).send('Could not complete scrape')
    }
}