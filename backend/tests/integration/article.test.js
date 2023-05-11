const request = require("supertest");
const server = require("./server");
const { Article } = require("../../models/article");
const { User } = require("../../models/user");
const fs = require("fs");
const path = require("path");

describe("INTEGRATION TEST : Article route", () => {
  let adminToken;
  let submitData;
  beforeEach(async () => {
    require("../../utils/firstRun")();
    const res = await request(server).post("/auth/login").send({
      email: "admin@cmc.lk",
      password: "12345",
    });
    adminToken = res.headers["x-auth-token"];
    submitData = {
      title: "test article",
      description: "test description",
      picture: path.join(__dirname, "test.jpg"),
    };
  });
  afterEach(async () => {
    await Article.deleteMany({});
  });
  describe("GET /articles/", () => {
    it("should return an empty list of articles", async () => {
      const res = await request(server).get("/articles/");
      expect(res.status).toBe(200);
      expect(res.text).toBe("[]");
    });
  });
  describe("POST /articles/", () => {
    it("should create a new article", async () => {
      const res = await request(server)
        .post("/articles/")
        .set("x-auth-token", adminToken)
        .attach("picture", submitData.picture)
        .field("title", submitData.title)
        .field("description", submitData.description);

      expect(res.status).toBe(200);
      expect(res.text).toBe("Article Created Successfully");
    });
    it("should return 400 if title is missing", async () => {
      delete submitData.title;
      const res = await request(server)
        .post("/articles/")
        .set("x-auth-token", adminToken)
        .attach("picture", submitData.picture)
        .field("description", submitData.description);

      expect(res.status).toBe(400);
      expect(res.text).toBe('"title" is required');
    });
    it("should return 400 if description is missing", async () => {
      delete submitData.description;
      const res = await request(server)
        .post("/articles/")
        .set("x-auth-token", adminToken)
        .attach("picture", submitData.picture)
        .field("title", submitData.title);

      expect(res.status).toBe(400);
      expect(res.text).toBe('"description" is required');
    });
    it("should return 400 if picture is missing", async () => {
      const res = await request(server)
        .post("/articles/")
        .set("x-auth-token", adminToken)
        .field("title", submitData.title)
        .field("description", submitData.description);

      expect(res.status).toBe(400);
      expect(res.text).toBe("Picture required or Invalid picture type");
    });
  });
});
