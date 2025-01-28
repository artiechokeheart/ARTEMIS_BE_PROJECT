const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");

const { getTopics } = require("./controllers/topics.controllers");
const { getArticlesById } = require("./controllers/articles.controllers");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/api", (req, res, next) => {
  res.send({ endpoints: endpoints });
});

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesById);

//error handlers

app.all("*", (req, res) => {
  res.status(404).send({ error: "404 - page not found" });
});

app.use((err, request, response, next) => {
  console.log(err, "<-- Unhandled Error");
  res.status(500).send({ error: "Server error" });
});

module.exports = app;
