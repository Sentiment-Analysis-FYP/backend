import {NextFunction, Request, Response} from "express";

const express = require('express')
const router = express.Router()

/*
* Routes for machine learning backend operations
* */
// router.use((req: Request, res: Response, next: NextFunction) => {
//     // TODO: middleware here
// })

// request SA

// receive SA completion status
router.post(
    '/complete',
    [],
)

export default router