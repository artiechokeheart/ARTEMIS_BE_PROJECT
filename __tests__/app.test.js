const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

/* Set up your beforeEach & afterAll functions here */
beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api/")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: should respond with an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const topics = response.body;
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
  test("404: should respond with a 404 error", () => {
    return request(app)
      .get("/api/topic")
      .expect(404)
      .then((response) => {
        const error = response.body;
        expect(error).toEqual({ error: "404 - page not found" });
      });
  });
});

describe("GET /api/articles/article:id", () => {
  test("200: Responds with an article object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const article = response.body;
        expect(article.article_id).toBe(1);
        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });

  describe("Errors", () => {
    test("Recieve a 400 when article_id is NaN", () => {
      return request(app)
        .get("/api/articles/mitch")
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ error: "400 - bad request" });
        });
    });
    test("Recieve a 404 when article_id is out of range", () => {
      return request(app)
        .get("/api/articles/2000")
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ error: "404 - page not found" });
        });
    });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const articles = response.body;
        expect(articles.length).toEqual(13);
        articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
          expect(!article.body).toEqual(true);
          //double check if looking for a falsy value can give you false positives?
        });
      });
  });
  test("200: Responds with an array in decending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const articles = response.body;
        expect(articles).toBeSorted({ descending: true });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with an array of comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        const comments = response.body;
        expect(comments.length).toEqual(11);
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.article_id).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.author).toBe("string");
        });
      });
  });
  test("200: Responds with an array in decending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const comments = response.body;
        expect(comments).toBeSorted({ descending: true });
      });
  });
  describe("Errors", () => {
    test("400: Recieve a 400 when article_id is NaN", () => {
      return request(app)
        .get("/api/articles/mitch/comments")
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ error: "400 - bad request" });
        });
    });
    test("404: Recieve a 404 when article_id does not exist but is a valid data type", () => {
      return request(app)
        .get("/api/articles/15/comments")
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ error: "404 - page not found" });
        });
    });
    test("Recieve a 200, not an error, when the article_id exists but has not comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual([]);
        });
    });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("200: Responds with the posted comment", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "icellusedkars",
        body: "That's, like, the whole point....",
      })
      .expect(201)
      .then((response) => {
        const comment = response.body;
        expect(typeof comment).toBe("object");
        expect(comment.article_id).toEqual(1);
        expect(comment.author).toEqual("icellusedkars");
        expect(typeof comment.body).toEqual("string");
        expect(typeof comment.comment_id).toEqual("number");
        expect(comment.votes).toEqual(0);
        expect(typeof comment.created_at).toEqual("string");
      });
  });
  test.todo(
    "Double check if test is needed to check the time posted as a date (date.now/date.parse etc)"
  );
  describe("Errors", () => {
    test("404: Recieve a 404 when article_id does not exist but is a valid data type", () => {
      return request(app)
        .post("/api/articles/20/comments")
        .send({
          username: "icellusedkars",
          body: ".",
        })
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ error: "404 - page not found" });
        });
    });
    test("404: Recieve a 404 error when the user does not exist", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .send({
          username: "xXx_girlypop_xXx",
          body: "xoxox",
        })
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ error: "404 - page not found" });
        });
    });
    test("400: Recieve a 400 error when the article does not exist", () => {
      return request(app)
        .post("/api/articles/mitch/comments")
        .send({
          username: "icellusedkars",
          body: "Wow.",
        })
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ error: "400 - bad request" });
        });
    });
    test("400: Recieve a 400 for an empty body string", () => {
      return request(app)
        .post("/api/articles/9/comments")
        .send({
          username: "icellusedkars",
          body: "",
        })
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            error: "400 - bad request",
          });
        });
    });
    test("400: Recieve a 400 when there is no body", () => {
      return request(app)
        .post("/api/articles/9/comments")
        .send({
          username: "icellusedkars",
        })
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            error: "400 - bad request",
          });
        });
    });
  });
});

describe("PATCH /api/articles/article:id", () => {
  test("200: Responds with an updated article object", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 1 })
      .expect(202)
      .then((response) => {
        const article = response.body;
        expect(article.article_id).toBe(1);
        expect(article.votes).toBe(101);
      });
  });
  test("200: Responds with an updated article object", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -1 })
      .expect(202)
      .then((response) => {
        const article = response.body;
        expect(article.article_id).toBe(1);
        expect(article.votes).toBe(99);
      });
  });
  describe("Errors", () => {
    test("400: Recieve a 400 when article_id is NaN", () => {
      return request(app)
        .get("/api/articles/mitch")
        .send({ inc_votes: -1 })
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ error: "400 - bad request" });
        });
    });
    test("404: Recieve a 404 when article_id doesn't exist", () => {
      return request(app)
        .get("/api/articles/1000")
        .send({ inc_votes: 100 })
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ error: "404 - page not found" });
        });
    });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: Recieve only a status 204 and no content", () => {
    return request(app)
      .delete("/api/comments/10")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });

  describe("Errors", () => {
    test("404: Reieve a 404 error when the comment doesn't exist", () => {
      return request(app)
        .delete("/api/comments/300")
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ error: "404 - page not found" });
        });
    });
    test("400: Reieve a 400 error when the comment doesn't exist", () => {
      return request(app)
        .delete("/api/comments/threehundred")
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ error: "400 - bad request" });
        });
    });
  });
});

describe("GET /api/users", () => {
  test("200: should respond with an array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        const users = response.body;
        expect(users.length).toBe(4);
        users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});

describe("GET /api/articles Sorting Queries", () => {
  test("200: Responds with an array in ascending order", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then((response) => {
        const articles = response.body;
        expect(articles).toBeSorted({ ascending: true });
      });
  });
  test("200: Responds with an array sorted by article_id in ascending order", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=asc")
      .expect(200)
      .then((response) => {
        const articles = response.body;
        expect(articles).toBeSorted({ ascending: true });
        expect(articles[0].article_id).toEqual(1);
      });
  });
  test("200: Responds with an array sorted by article_id in ascending order", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id")
      .expect(200)
      .then((response) => {
        const articles = response.body;
        expect(articles).toBeSorted({ descending: true });
        expect(articles[0].article_id).toEqual(13);
      });
  });

  describe("Errors", () => {
    test("400: if order is not asc/desc, recieve an error", () => {
      return request(app)
        .get("/api/articles?order=topic")
        .expect(400)
        .then((response) => {
          const articles = response.body;
          expect(articles).toEqual({ error: "400 - bad request" });
        });
    });
    test("404: if sort_by is not a valid column, recieve an error", () => {
      return request(app)
        .get("/api/articles?sort_by=hello")
        .expect(404)
        .then((response) => {
          const articles = response.body;
          expect(articles).toEqual({ error: "404 - page not found" });
        });
    });
  });
});

describe("GET /api/articles filter by topic", () => {
  test("200", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then((response) => {
        const article = response.body;
        expect(article).toEqual();
      });
  });
  test("404", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(404)
      .then((response) => {
        const article = response.body;
        expect(article).toEqual({ error: "404 - page not found" });
      });
  });
});
