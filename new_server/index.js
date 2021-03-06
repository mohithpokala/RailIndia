const express = require("express");
const app = express();
const {routes} =require('./Routes');
const cors = require("cors");
app.use(cors());
app.use(express.json()); 
app.use(routes);
const port = 8000;

app.listen(port, () => {
    console.log("server has started on port " + port);
});