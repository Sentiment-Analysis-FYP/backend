import {Router} from "express";
import * as controller from '../controller/auth.controller'
import {checkDuplicatedEmail} from "../middleware/checkDuplicatedEmail";

const express = require('express')
const router = Router()

/*
* Routes for user authentication
* */
// router.use((req: Request, res: Response, next: NextFunction) => {
//     // TODO: middleware here
// })

router.post(
    '/register',
    // [checkDuplicatedEmail],
    controller.signup
)

router.post(
    '/signin',
    controller.signin
)

export default router