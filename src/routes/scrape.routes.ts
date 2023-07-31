import * as controller from "../controller/scrape.controller"
const express = require('express')
const router = express.Router()

/*
* Routes for retrieving data from twitter
* */

router.post('/begin',
    controller.scrape)

router.post('/user',
    controller.getUserScrapes)

export default router