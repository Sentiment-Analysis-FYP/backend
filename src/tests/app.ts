import request from "supertest"

const dotenv = require('dotenv')
dotenv.config()
const BASE_URL = process.env.BASE_URL
describe('Server Connection test', () => {
    test('Connection Test', async () => {
        const res = await request(BASE_URL).get("/")
        expect(res.status).toEqual(200)
    })
});