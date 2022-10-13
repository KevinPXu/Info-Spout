const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  console.log(req.query.input);
  axios
    .get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.893372%2C-82.711852&radius=2500&type=restaurant&key=AIzaSyB00eZmaYmhckWTwIbOsT034z9FiRToqaw"
    )
    .then((response) => {
      res.json(response.data);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.893372%2C-82.711852&radius=2500&type=restaurant&key=AIzaSyB00eZmaYmhckWTwIbOsT034z9FiRToqaw
