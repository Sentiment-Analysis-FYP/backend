import {Request, Response} from "express";
import {ScrapeParameters} from "../utils";
import {runScrape} from "../utils/scrape/runScrape";
import {dataSource} from "../data-source";
import {User} from "../models/user";
import {Scrape} from "../models/scrape";

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

export const getUserScrapes = async (req: Request, res: Response) => {
    try {
        const user = await dataSource.getRepository(User)
            .findOneBy({
                email: req.body.email
            })

        if (!user) return res.status(404).send()

        const scrapes = await dataSource.getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.scrapes", "scrape")
            .where("user.id = :id", {id: user.id})
            .getMany()

        console.log(scrapes[0].scrapes)
        console.log(user.scrapes ? user.scrapes : user.email)
        return res.status(200).send({scrapes: scrapes})
    } catch (error) {
        return res.status(500).send(error)
    }
}