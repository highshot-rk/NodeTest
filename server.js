const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

var server = express()

// set middileware to parse
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

// root route
server.get("/", (req, res) => {
    res.json({
        message: "Welcome to here"
    })
})

// Create a method in your code to validate your user
// auth(username and password)
server.post("/auth", (req, res) => {
    var username = req.body.username ? req.body.username : ""
    var password = req.body.password ? req.body.password : ""
    if (username === "" || password === "") {
        res.json({
            result: false,
            message: "fill the username and password"
        })
    } else {
        axios.post("https://hummingbird-staging.podgroup.com/auth/token", {
            username: username,
            password: password,
        }).then(swaggerResp => {
            res.json({
                result: true,
                ...swaggerResp.data,
            })
        }).catch(err => {
            if (err.response) {
                res.json({
                    result: false,
                    status: err.response.status,
                    statusCode: err.response.data.code,
                    statusMessage: err.response.data.message,
                })
            } else {
                res.json({
                    result: false,
                    status: "---",
                    statusCode: "Unknown wrror, may be internet connection error",
                })
            }
        })
    }
})

// run server
server.listen(3000, () => {
    console.log("server is working")
})

module.exports = server;