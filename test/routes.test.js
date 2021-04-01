require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const db = require('../models/index');

let token;

afterAll(async done => {
    try {
        await db.sequelize.sync({force: true});
        console.log('db sync...');
        await db.sequelize.close();
        done();
    } catch (error) {
        console.error(error);
    }
})

describe("user authentication", () => {
    it("creates new user", async done => {
        try {
            const res = await request(app)
                .post("/api/users/signup")
                .send({
                    firstName: "Test",
                    lastName: "Test",
                    email: "test@test.co",
                    password: "test"
                })
                expect(res.statusCode).toEqual(201)
                expect(res.body).toHaveProperty('data')
                done();
        } catch (error) {
            expect(error).toEqual(new Error());
            done();
        }
    })

    it("logs in user", async done => {
        try {
            const res = await request(app)
                .post("/api/users/login")
                .send({
                    email: "test@test.co",
                    password: "test"
                })
                expect(res.statusCode).toEqual(200)
                expect(res.body).toHaveProperty('data')
                expect(res.body).toHaveProperty('token')
                token = res.body.token
                done();
        } catch (error) {
            expect(error).toEqual(new Error());
            done();
        }
    })
})

describe("make transactions", () => {
    it("should deposit funds", async done => {
        try {
            const res = await request(app)
                .post("/api/transactions/deposit-funds")
                .set('Authorization', token)
                .send({
                    amount: 10000
                })
                expect(res.statusCode).toEqual(200)
                done();
        } catch (error) {
            expect(error).toEqual(new Error());
            done();
        }
    })

})