const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");
const cors = require("cors");

const { getTopics } = require("./controllers/topics.controllers");
const {
  getArticlesById,
  getArticles,
  patchArticlesById,
} = require("./controllers/articles.controllers");
const {
  getArticleComments,
  postComment,
  deleteArticleComments,
} = require("./controllers/comments.controllers");
const { getUsers } = require("./controllers/users.controllers");

app.use(cors());
app.use(express.json());

app.get("/api", (request, response, next) => {
  response.send({ endpoints: endpoints });
});

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticlesById);

app.delete("/api/comments/:comment_id", deleteArticleComments);

app.get("/api/users", getUsers);

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
