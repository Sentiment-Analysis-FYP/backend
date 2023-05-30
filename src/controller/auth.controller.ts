import e, {Request, Response} from "express";
import {dataSource} from "../data-source";
import {User} from "../models/user";
import bcrypt from "bcrypt"

const dotenv = require('dotenv');

const SALT: number = 11

dotenv.config();
export const signup = async (req: Request, res: Response) => {
    try {
        const user = await dataSource.getRepository(User).create({
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, SALT)
        })

        if (!user) return res.status(400).send('Unable to create user')
        return res.status(201).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await dataSource.getRepository(User).findOneBy({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, SALT)
        })

        if (!user) return res.status(404).send("User not found")

        // TODO: found user
    } catch (error) {
        return res.status(500).send(error)
    }
}