import {NextFunction, Request, Response} from "express";
import * as controller from '../controller/auth.controller'
import {checkDuplicatedEmail} from "../middleware/checkDuplicatedEmail";

const express = require('express')
const router = express.Router()

/*
* Routes for user authentication
* */
router.use((req: Request, res: Response, next: NextFunction) => {
    // TODO: middleware here
})

router.post(
    '/auth/signup',
    [checkDuplicatedEmail],
    controller.signup
)

router.post(
    '/auth/signin',
    [],
    controller.signin
)