var app = require('../server');
var chai = require('chai');
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
})