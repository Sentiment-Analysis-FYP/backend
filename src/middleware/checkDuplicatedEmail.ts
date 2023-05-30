import {NextFunction, Request, Response} from "express";
import {dataSource} from "../data-source";
import {User} from "../models/user";

export const checkDuplicatedEmail = async (req: Request, res: Response, next: NextFunction) => {
    const user = await dataSource.getRepository(User).findOne({where: {email: req.body.email}})
    if (user) return res.status(409).send('Email already in use')
    next()
}