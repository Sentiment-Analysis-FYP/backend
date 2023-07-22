import axios from "axios"
import {ScrapeParameters} from "../index";

require('dotenv').config()

export const runScrape = async (scrapeParams: ScrapeParameters) => {
    // check which info is provided to determine type of scrape
    // case 1: keyword only
    // case 2: keyword and start date
    // case 3: keyword and end date
    // case 4: keyword and start & end date
    // default: case 1
    // else: cannot scrape

    const keywords = scrapeParams.keywords
    const startDate = scrapeParams.startDate
    const endDate = scrapeParams.endDate

    // no keywords = no scrape
    if (keywords.length == 0) return

    // clean parameters
    const earliestDate = new Date(0).toISOString().split('.')[0] + 'Z'
    const currentDate = new Date().toISOString().split('.')[0] + 'Z'
    const formattedStartDate = startDate ? new Date(startDate).toISOString() : earliestDate
    const formattedEndDate = endDate ? new Date(endDate).toISOString() : currentDate
    const query = keywords.join(' OR ')

    // Make the request to Twitter API
    const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN
    const response = await axios.post('https://api.twitter.com/2/tweets/search/recent', {
        headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
        },
        params: {
            max_results: 2,
            query: query,
            // start_time: formattedStartDate,
            // end_time: formattedEndDate,
            // "tweet.fields": "referenced_tweets.id"
        },
    })

    if (response.status != 200) console.log(response)

    return response
}