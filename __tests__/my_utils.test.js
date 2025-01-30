const { checkArticleExists } = require("../utils/checkCategoryExists");

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
