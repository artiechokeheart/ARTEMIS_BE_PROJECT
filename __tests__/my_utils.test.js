const {
  checkArticleExists,
  checkUserExists,
  checkCommentBody,
  checkCommentExists,
} = require("../utils/checkCategoryExists");
const db = require("../db/connection");

afterAll(() => {
  return db.end();
});
describe("Function checkArticleExists", () => {
  test("Returns a promise if the category exists", () => {
    const input = 1;
    return checkArticleExists(input).then((data) =>
      expect(data).toBe("check complete - category exists")
    );
  });
  test("Rejects the promise if the category doesn't exists", () => {
    const input = 100;
    return checkArticleExists(input)
      .then((data) => {})
      .catch((error) => {
        expect(error.status).toBe(404);
      });
  });
});

describe("Function checkUserExists", () => {
  test("Returns a promise if the user exists", () => {
    const input = "lurker";
    return checkUserExists(input).then((data) =>
      expect(data).toBe("check complete - user exists")
    );
  });
  test("Rejects the promise if the user doesn't exists", () => {
    const input = "xXxgirlyxXx";
    return checkUserExists(input)
      .then((data) => {})
      .catch((error) => {
        expect(error.status).toBe(404);
      });
  });
});

describe("Function checkCommentBody", () => {
  test("Returns a promise if comment body is OK", () => {
    const input = "Something witty I'm sure";
    return checkCommentBody(input).then((data) =>
      expect(data).toBe("check complete - body OK")
    );
  });
  test("Rejects the promise if the comment body is 0 characters", () => {
    const input = "";
    return checkCommentBody(input)
      .then((data) => {})
      .catch(({ status, error }) => {
        expect(status).toBe(400);
        expect(error).toEqual({});
      });
  });
  test("Rejects the promise when the comment body is not a string", () => {
    const input = 88878;
    return checkCommentBody(input)
      .then((data) => {})
      .catch(({ status, error }) => {
        expect(status).toBe(400);
        expect(error).toEqual({});
      });
  });
  test("Rejects the promise when there is no body present", () => {
    return checkCommentBody()
      .then((data) => {})
      .catch(({ status, error }) => {
        expect(status).toBe(400);
        expect(error).toEqual({});
      });
  });
});

describe("Function checkCommentExists", () => {
  test("Returns a promise if the comment exists", () => {
    const input = 1;
    return checkCommentExists(input).then((data) =>
      expect(data).toBe("check complete - category exists")
    );
  });
  test("Rejects the promise if the comment doesn't exists", () => {
    const input = "300";
    return checkCommentExists(input)
      .then((data) => {})
      .catch((error) => {
        expect(error.status).toBe(404);
      });
  });
});
