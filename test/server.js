var app = require('../server');
var chai = require('chai');
var faker = require('faker');
var request = require('supertest');

var expect = chai.expect;

describe('RestAPI tests', function() {
    // test root router
    it('Default router testing...', function(done) {
        request(app)
        .get('/')
        .end(function(err, res) {
            expect(res.statusCode).equal(200)
            expect(JSON.stringify(res.body)).equal(JSON.stringify({message: "Welcome to here"}))
            done();
        });
    });

    // test auth user
    it('Auth user testing...', function(done) {
        request(app)
        .post('/auth')
        .send({username: "sagar.neupane", password: "enapuen.ragas"})
        .expect(200)
        .end(function(err, res) {
            expect(res.body.result).equal(true)
            done();
        });
    });

    // test create user in account
    it('Create user testing...', function(done) {
        request(app)
        .post('/users')
        .set({ "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2MGQ0NWRmZGFjZGJlYjAwMjA0OGMwMTMifQ.6Z2d-GtiKUo4EeuDbsS5_97dbAG09jVKxW_55QDcTOA" })
        .send({
            username: faker.internet.userName(),
            password: "enapuen.ragas",
            email: "sagar.neupane@testemail.com",
            accountId: "65e5f451-54e3-45ea-84e9-dcdd8c59078e",
            status: "active",
            permissions: [{
                "accountId": "65e5f451-54e3-45ea-84e9-dcdd8c59078e",
                "roles": [
                    "admin"
                ],
            }]
        })
        .expect(200)
        .end(function(err, res) {
            expect(res.body.result).equal(true)
            done();
        });
    });
    
    // test list all the assets of the account
    it('List assets testing...', function(done) {
        request(app)
        .get('/assets?accountId=65e5f451-54e3-45ea-84e9-dcdd8c59078e')
        .set({ "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2MGQ0NWRmZGFjZGJlYjAwMjA0OGMwMTMifQ.6Z2d-GtiKUo4EeuDbsS5_97dbAG09jVKxW_55QDcTOA" })
        .expect(200)
        .end(function(err, res) {
            expect(res.body.result).equal(true)
            done();
        });
    });

    // test activate an assets of the account
    it('Activate an asset testing...', function(done) {
        request(app)
        .put('/assets/sagarn.neupane1/subscribe')
        .set({ "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2MGQ0NWRmZGFjZGJlYjAwMjA0OGMwMTMifQ.6Z2d-GtiKUo4EeuDbsS5_97dbAG09jVKxW_55QDcTOA" })
        .send({
            accountId: "65e5f451-54e3-45ea-84e9-dcdd8c59078e",
        })
        .expect(200)
        .end(function(err, res) {
            expect(res.body.result).equal(true)
            done();
        });
    });
})