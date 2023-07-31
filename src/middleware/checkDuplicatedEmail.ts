import {NextFunction, Request, Response} from "express";
import {dataSource} from "../data-source";
import {User} from "../models/user";

export const checkDuplicatedEmail = async (req: Request, res: Response, next: NextFunction) => {
    // if (!req.body || !req.body.email) return res.status(400).send('BR')
    try {
        const {email} = req.body
        if (!email) return res.status(400).send("Bad request cde")
        const user = await dataSource.getRepository(User).findOne({where: {email: email}})
        if (user) return res.status(409).send('Email already in use')
    } catch (e) {
        console.log(e)
    }
    next()
}