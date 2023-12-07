// Dependencies
import mongoose from "mongoose";
import chai from "chai";
import supertest from "supertest";
import logger from "../../src/utils/loggers.js";
import 'dotenv/config';

import SessionModel from "../../src/models/users.js"

const expect = chai.expect;
const requester = supertest(process.env.APP_URL + process.env.APP_PORT);

await mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => logger.info('Conectado a la BDD Mongo (test mode)'))
    .catch(error => logger.error('Error al conectar a la BDD Mongo (test mode): ' + error));

describe('Testing de sessions en Tienda Online', function () {
    this.timeout(7000);
    let token = "";

    beforeEach(async function () {
        await requester.post('/api/sessions/register')
            .send({
                first_name: "Tester",
                last_name: "Surname",
                email: process.env.TESTING_EMAIL,
                password: process.env.TESTING_PASSWORD,
                age: 24
            });
        // Logout user
        await requester.get('/api/sessions/logout').set("Cookie", `jwtCookie=${token}`);
        token = "";
    });
    describe('Test de sessions', function () {
        it('Test endpoint: POST /api/sessions/login, sea un payload', async () => {
            const response = await requester.post('/api/sessions/login')
                .send({
                    email: process.env.TESTING_EMAIL,
                    password: process.env.TESTING_PASSWORD
                });
            expect(response.status).to.equal(200);
            expect(response.body.payload).to.have.property("first_name", "Tester");
        });
    });
    after(async function () {
        await SessionModel.deleteOne({ email: process.env.TESTING_EMAIL });
        logger.info("Testing user deleted");
    });
});