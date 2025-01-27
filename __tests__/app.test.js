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

// // afterAll(() => {
// //   return db.end;
// // });

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
  test("should respond with an array of topics", () => {
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
  test("should respond with a 404 error", () => {
    return request(app)
      .get("/api/topic")
      .expect(404)
      .then((response) => {
        const error = response.body;
        console.log(error);
        expect(error).toEqual({ error: "404 - page not found" });
      });
  });
});
