const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/",
    function(req,res){
        console.log(req.body);
    }
)

app.listen(3001, function () {
    console.log("Server started at 3001");
});
