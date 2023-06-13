import request from "supertest";
import {app} from "../index";

describe('Authentication Routes Tests', () => {
    const testUser = {
        email: "foo@example.com",
        name: "bar",
        password: "some password"
    }

    test('Sign Up Test', async () => {
        const response = await request(app).post('/auth/register').send({
            ...testUser
        })
        expect(response.body).toEqual({})
    })
});