const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/api", (req, res) => {
  res.send({ endpoints: endpoints });
});

module.exports = app;
