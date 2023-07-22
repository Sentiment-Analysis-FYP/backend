import * as controller from '../controller/ml.controller'

const express = require('express')
const router = express.Router()

/*
* Routes for machine learning backend operations
* */

// request SA
router.post(
    '/upload/run_analysis/:scrapeId',
    controller.runAnalysis
)

// receive SA completion status
router.post(
    '/complete',
    controller.getCompleteAnalysis
)

export default router