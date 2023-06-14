import e, {Request, Response} from "express";
import {dataSource} from "../data-source";
import {User} from "../models/user";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const dotenv = require('dotenv');

const SALT: number = 11

const SECRET: string = "sa123gray8"

dotenv.config();
export const signup = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.name)
            return res.status(400).send('BR')

        const user = await dataSource.getRepository(User).create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, SALT)
        })

        if (!user) return res.status(400).send('Unable to create user')

        await dataSource.getRepository(User).save(user)
        return res.status(201).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await dataSource.getRepository(User).findOneBy({
            email: req.body.email,
        })
        if (!user) return res.status(404).send("Invalid credentials")

        // check password
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid) return res.status(404).send("Invalid credentials")

        const token = jwt.sign({id: user.id}, SECRET, {
            expiresIn: 5184000
        })

        return res.status(200).send({
            ...user,
            token: token
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}