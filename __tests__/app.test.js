const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

/* Set up your beforeEach & afterAll functions here */
// beforeEach(() => {
//   return seed(testData);
// });

// afterAll(() => {
//   return db.end;
// });

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
  test("Response with an array in decending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const articles = response.body;
        expect(articles).toBeSorted({ descending: true });
        expect(articles[0].article_id).toEqual(3);
        expect(articles[articles.length - 1].article_id).toEqual(7);
        test.todo(
          "article 4 & 5 have the same date & time, possibly test for this"
        );
      });
  });
});

// describe("Errors", () => {
//   test("Recieve a 400 when article_id is NaN", () => {
//     return request(app)
//       .get("/api/articles/mitch")
//       .expect(400)
//       .then((response) => {
//         expect(response.body).toEqual({ error: "400 - bad request" });
//       });
//   });
//   test("Recieve a 404 when article_id is out of range", () => {
//     return request(app)
//       .get("/api/articles/2000")
//       .expect(404)
//       .then((response) => {
//         expect(response.body).toEqual({ error: "404 - page not found" });
//       });
//   });
// });
