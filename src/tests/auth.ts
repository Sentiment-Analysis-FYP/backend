import request from "supertest";

const dotenv = require('dotenv')
dotenv.config()
const BASE_URL = process.env.BASE_URL

describe('Authentication Routes Tests', () => {
    const testUser = {
        email: "foo2@example.com",
        name: "bar",
        password: "some password"
    }

    test('Sign Up Test', async () => {
        const response = await request(BASE_URL).post('/auth/register').send({
            ...testUser
        })
        expect(response.status).toEqual(201)
    })
});