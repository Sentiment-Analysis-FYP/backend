import request from "supertest"
import {app} from "../index"

describe('Server Connection test', () => {
    test('Connection Test', async () => {
        const res = await request(app).get("/")
        expect(res.body).toEqual("Sentiment Analysis FYP Server")
    })
});