require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 9000;
const app = express();
const bodyParser = require('body-parser');
const schemas = require("./sche");

app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(process.env.URIKEY).then(() => console.log('db connected'))

app.get("/api", (req, res) => {
    schemas.find().then(function(a){
        console.log(JSON.stringify(a))
        return res.send(JSON.stringify(a));
    })
});

app.post("/api", (req, res) => {
    console.log(req.body);
    try {
        schemas.deleteMany({ id:{"$gte":1} }).then(function(){
            schemas.create(req.body);
        }).catch(function(error){
            console.log(error);
        });
    }
    catch (error) {
        console.log("error", error);
    }
});

app.listen(PORT, () => {
    console.log("Server running at port " + PORT);
});