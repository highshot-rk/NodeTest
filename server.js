const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")
const async = require("async");
const URL = "https://hummingbird-staging.podgroup.com"
const NetError = {
    result: false,
    status: "---",
    statusCode: "Unknown wrror, may be internet connection error",
}

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
            statusMessage: "fill the username and password"
        })
    } else {
        axios.post(URL + "/auth/token", {
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
                res.json(NetError)
            }
        })
    }
})

// Create a method that allow to create users in the account
// users (token, username, password...)
server.post("/users", (req, res) => {
    var token = req.headers["x-access-token"] ? req.headers["x-access-token"] : "";
    var username = req.body.username ? req.body.username : "";
    var password = req.body.password ? req.body.password : "";
    var email = req.body.email ? req.body.email : "";
    var accountId = req.body.accountId ? req.body.accountId : "";
    var status = req.body.status ? req.body.status : "";
    var permissions = req.body.permissions ? req.body.permissions : "";
    try {
        permissions = JSON.parse(permissions)
    } catch (error) {
        permissions = []
    }
    if (username === "" || password === "" || email == "" || accountId == "" || status == "") {
        res.json({
            result: false,
            statusMessage: "fill the parameters"
        })
    } else {
        axios.post(URL+ "/users", {
            accountId: accountId,
            username: username,
            password: password,
            email: email,
            status: status,
            permissions: permissions,
        }, {
            headers: {
                "x-access-token": token
            }
        }).then(res1 => {
            res.json({
                result: true,
                ...res1.data,
            })
        }).catch(err => {
            if (err.response) {
                res.json({
                    result: false,
                    status: err.response.status,
                    statusCode: err.response.data.code,
                    statusMessage: err.response.data.message,
                });
            } else {
                res.json(NetError)
            }
        })
    }
});

// Create a method to list all the assets of the account
// assets (token, accountId)
server.get("/assets", (req, res) => {
    var accountId = req.query.accountId ? req.query.accountId : "";
    var token = req.headers["x-access-token"] ? req.headers["x-access-token"] : "";

    if (accountId === "") {
        res.json({
            "result": false,
            "msg": "fill the parameters"
        });
    } else {
        axios.get(`https://hummingbird-staging.podgroup.com/assets?accountId=${accountId}`, {
            headers: {
                "x-access-token": token
            }
        }).then(res1 => {
            res.json({
                result: true,
                ...res1.data,
            })
        }).catch(err => {
            res.json({
                "result": false,
                "status": err.response.status,
                "statusText": err.response.statusText,
                "statusMessage": err.response.data.message,
            })
        })
    }
});

// Create a method to activate an asset
// put-assets(iccid, accountId)
server.put("/assets/:iccid/subscribe", (req, res) => {
    var iccid = req.params.iccid ? req.params.iccid : "";
    var token = req.headers["x-access-token"] ? req.headers["x-access-token"] : "";
    var accountId = req.body.accountId ? req.body.accountId : "";

    if (accountId === "" || iccid == "") {
        res.json({
            "result": false,
            "msg": "fill the parameters"
        });
    } else {
        
        axios.get(`https://hummingbird-staging.podgroup.com/products?accountId=${accountId}`, {
            headers: {
                "x-access-token": token
            }
        }).then(res1 => {
            var products = res1.data;

            var result = [];
            async.forEachOf(products, (product, id, callback) => {
                axios.put(`https://hummingbird-staging.podgroup.com/assets/${iccid}/subscribe`, {
                    accountId: accountId,
                    subscription: {
                        subscriberAccountId: accountId,
                        productId: product._id,
                    }
                },{
                    headers: {
                        "x-access-token": token
                    }
                }).then(res2 => {
                    result.push(res2.data)

                    return callback();
                }).catch(err => {
                    return callback();
                })
            }, err => {
                if (err) {
                    console.log(err)
                    res.json({
                        "result": false
                    });
                } else {
                    res.json({
                        "result": true,
                        "assets": result
                    })
                }
            })
        }).catch(err => {
            console.log(err)
            if (err.response) {
                res.json({
                    "result": false,
                    "status": err.response.status,
                    "statusText": err.response.statusText,
                    "statusMessage": err.response.data.message,
                })
            } else {
                res.json({
                    "result": false,
                    "status": "---",
                    "statusText": "Unknown",
                })
            }
        })
    }
});

// run server
server.listen(3000, () => {
    console.log("server is working")
})

module.exports = server;