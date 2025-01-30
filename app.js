const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");

const { getTopics } = require("./controllers/topics.controllers");
const {
  getArticlesById,
  getArticles,
  getArticleComments,
  postComment,
} = require("./controllers/articles.controllers");

app.use(express.json());

app.get("/", (request, response) => {
  response.send("hello world!");
});

app.get("/api", (request, response, next) => {
  response.send({ endpoints: endpoints });
});

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postComment);

// app.patch("/api/articles/:article_id", patchArticlesById);

//error handlers

app.all("*", (request, response) => {
  response.status(404).send({ error: "404 - page not found" });
});

app.use((error, request, response, next) => {
  if (error.status === 400) {
    response.status(400).send({ error: "400 - bad request" });
  } else if (error.code === "22P02") {
    response.status(400).send({ error: "400 - bad request" });
  } else {
    next(error);
  }
});

app.use((error, request, response, next) => {
  if (error.status === 404) {
    response.status(404).send({ error: "404 - page not found" });
  } else {
    next(error);
  }
});

app.use((error, request, response, next) => {
  console.log("This is an unhandled error! ->", error, "<- Error");
  response.status(500).send({ error: "Server error" });
});

module.exports = app;
