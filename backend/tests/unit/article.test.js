const { validateArticle } = require("../../models/article");
const mongoose = require("mongoose");

describe("UNIT TEST : Validate Article", () => {
  let article;
  beforeEach(() => {
    article = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      title: "title",
      description: "description",
      picture: "picture",
    };
  });
  it("Should return null because article is valid", () => {
    const result = validateArticle(article);
    expect(result).toBeNull();
  });
  it("Should return error because article id is invalid", () => {
    article._id = "1";
    const result = validateArticle(article);
    expect(result).toBe(
      '"_id" with value "' +
        article._id +
        '" fails to match the required pattern: /^[0-9a-fA-F]{24}$/'
    );
  });
  it("Should return null even article id isnt exist", () => {
    delete article._id;
    const result = validateArticle(article);
    expect(result).toBeNull();
  });
  it("Should return error because article's title isnt exist ", () => {
    delete article.title;
    const result = validateArticle(article);
    expect(result).toBe('"title" is required');
  });
  it("Should return error because article's title is less than 5 characters", () => {
    article.title = "1234";
    const result = validateArticle(article);
    expect(result).toBe('"title" length must be at least 5 characters long');
  });
  it("Should return error because article's title is more than 20 characters", () => {
    article.title = new Array(22).join("a");
    const result = validateArticle(article);
    expect(result).toBe(
      '"title" length must be less than or equal to 20 characters long'
    );
  });
  it("Should return error because article's description isnt exist ", () => {
    delete article.description;
    const result = validateArticle(article);
    expect(result).toBe('"description" is required');
  });
  it("Should return error because article's description is less than 5 characters", () => {
    article.description = "1234";
    const result = validateArticle(article);
    expect(result).toBe(
      '"description" length must be at least 5 characters long'
    );
  });
  it("Should return error because article's description is more than 1024 characters", () => {
    article.description = new Array(1027).join("a");
    const result = validateArticle(article);
    expect(result).toBe(
      '"description" length must be less than or equal to 1024 characters long'
    );
  });
  it("Should return null even because article's picture isnt exist ", () => {
    delete article.picture;
    const result = validateArticle(article);
    expect(result).toBeNull();
  });
  it("Should return error because article's picture is less than 5 characters", () => {
    article.picture = "1234";
    const result = validateArticle(article);
    expect(result).toBe('"picture" length must be at least 5 characters long');
  });
  it("Should return error because article's picture is more than 1024 characters", () => {
    article.picture = new Array(1027).join("a");
    const result = validateArticle(article);
    expect(result).toBe(
      '"picture" length must be less than or equal to 1024 characters long'
    );
  });
});
