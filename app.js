const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");

const { getTopics } = require("./controllers/topics.controllers");
const { getArticles } = require("./controllers/articles.controllers");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/api", (req, res, next) => {
  res.send({ endpoints: endpoints });
});

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

//error handlers

app.all("*", (req, res) => {
  res.status(404).send({ error: "404 - page not found" });
});

module.exports = app;
