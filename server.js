const express = require("express")
const bodyParser = require("body-parser")

var server = express();

server.listen(3000, () => {
    console.log("server is working")
});