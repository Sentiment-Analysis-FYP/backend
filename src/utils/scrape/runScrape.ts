import axios from "axios"
import {ScrapeParameters} from "../index";
import {dataSource} from "../../data-source";
import {User} from "../../models/user";
import {Scrape} from "../../models/scrape";

require('dotenv').config()

export const runScrape = async (scrapeParams: ScrapeParameters) => {
    // check which info is provided to determine type of scrape
    // usernames will always be searched independently
    // case 1: keyword only
    // case 2: keyword and start date
    // case 3: keyword and end date
    // case 4: keyword and start & end date
    // default: case 1
    // else: cannot scrape

    const username = scrapeParams.username
    const keywords = scrapeParams.keywords
    const startDate = scrapeParams.startDate
    const endDate = scrapeParams.endDate
    const email = scrapeParams.email
    const title = scrapeParams.title

    console.log(scrapeParams.title)

    // no keywords = no scrape
    if (keywords.length == 0 && username.length == 0) return

    // clean parameters
    const earliestDate = new Date(0).toISOString().split('.')[0] + 'Z'
    const currentDate = new Date().toISOString().split('.')[0] + 'Z'
    const formattedStartDate = startDate ? new Date(startDate).toISOString() : earliestDate
    const formattedEndDate = endDate ? new Date(endDate).toISOString() : currentDate
    // Make the request to ML SERVER
    const scrapeId = Math.floor(new Date().getTime() / 1000)
    const response = await axios.post(
        `${process.env.ML_SERVER}/scrape/${scrapeId}`,
        {
            username: username,
            keywords: keywords,
            email: email,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
        })

    console.log(response.status)

    if (response.status == 200) {
        // req success, store scrape id
        const user = await dataSource.getRepository(User).findOneBy({
            email: email
        })
        console.log(`scrape title is ${title}`)

        const scrape = await dataSource.getRepository(Scrape)
            .save({
                id: scrapeId.toString(),
                title: title ? title : 'Untitled Scrape',
                user: user!
            })

        if (user && scrape) {
            console.log(`here ${title}`)
            const userScrapes: Scrape[] = user.scrapes ? user.scrapes : []
            userScrapes.push(scrape)
            user.scrapes = userScrapes
            // console.log(user.scrapes)
        } else {
            console.log('fai')
        }
    }

    return response
}