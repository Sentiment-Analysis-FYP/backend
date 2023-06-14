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

    test('Log In Test', async () => {
        const response = await request(BASE_URL).post('/auth/signin').send({
            email: testUser.email,
            password: testUser.password
        })
        console.log(response)
        expect(response.status).toEqual(200)
    })
});
