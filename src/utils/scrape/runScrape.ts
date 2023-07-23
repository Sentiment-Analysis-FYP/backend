import axios from "axios"
import {ScrapeParameters} from "../index";

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

    // no keywords = no scrape
    if (keywords.length == 0 && username.length == 0) return

    // clean parameters
    const earliestDate = new Date(0).toISOString().split('.')[0] + 'Z'
    const currentDate = new Date().toISOString().split('.')[0] + 'Z'
    const formattedStartDate = startDate ? new Date(startDate).toISOString() : earliestDate
    const formattedEndDate = endDate ? new Date(endDate).toISOString() : currentDate
    const query = keywords.join(' OR ')

    // Make the request to ML SERVER
    const response = await axios.post(
        `${process.env.ML_SERVER}/scrape/${Math.floor(new Date().getTime() / 1000)}`,
        {
            ...scrapeParams,
            start_date: startDate,
            end_date: endDate
        })

    console.log(response.status)

    return response
}