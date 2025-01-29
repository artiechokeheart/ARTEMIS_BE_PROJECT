const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");

const { getTopics } = require("./controllers/topics.controllers");
const {
  getArticlesById,
  getArticles,
  getArticleComments,
} = require("./controllers/articles.controllers");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/api", (req, res, next) => {
  res.send({ endpoints: endpoints });
});

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles/:article_id/comments", getArticleComments);

//error handlers

app.all("*", (req, res) => {
  res.status(404).send({ error: "404 - page not found" });
});

app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ error: "400 - bad request" });
  }
});

app.use((err, request, response, next) => {
  console.log(err, "<-- Unhandled Error");
  ressponse.status(500).send({ error: "Server error" });
});

module.exports = app;
