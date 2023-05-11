const request = require("supertest");
const server = require("./server");
const { Collecting } = require("../../models/collecting");
const path = require("path");

describe("INTEGRATION TEST : Collecting route", () => {
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
      name: "test collecting",
      description: "test description",
      picture: path.join(__dirname, "test.jpg"),
      images: path.join(__dirname, "test.jpg"),
      lat: 6.9271,
      lng: 79.8612,
    };
  });
  afterEach(async () => {
    await Collecting.deleteMany({});
  });
  describe("GET /collectings/", () => {
    it("should return an empty list of collectings", async () => {
      const res = await request(server).get("/collectings/");
      expect(res.status).toBe(200);
      expect(res.text).toBe("[]");
    });
  });
  describe("POST /collectings/", () => {
    it("should create a new collecting", async () => {
      const res = await request(server)
        .post("/collectings/")
        .set("x-auth-token", adminToken)
        .attach("picture", submitData.picture)
        .attach("images", submitData.images)
        .field("name", submitData.name)
        .field("description", submitData.description)
        .field("lat", submitData.lat)
        .field("lng", submitData.lng);

      expect(res.status).toBe(200);
      expect(res.text).toBe("Successfully created Colleting place");
    });
    it("should return 400 if name is missing", async () => {
      delete submitData.name;
      const res = await request(server)
        .post("/collectings/")
        .set("x-auth-token", adminToken)
        .attach("picture", submitData.picture)
        .attach("images", submitData.images)
        .field("description", submitData.description)
        .field("lat", submitData.lat)
        .field("lng", submitData.lng);

      expect(res.status).toBe(400);
      expect(res.text).toBe('"name" is required');
    });
    it("should return 400 if description is missing", async () => {
      delete submitData.description;
      const res = await request(server)
        .post("/collectings/")
        .set("x-auth-token", adminToken)
        .attach("picture", submitData.picture)
        .attach("images", submitData.images)
        .field("name", submitData.name)
        .field("lat", submitData.lat)
        .field("lng", submitData.lng);
      expect(res.status).toBe(400);
      expect(res.text).toBe('"description" is required');
    });
    it("should return 400 if picture is missing", async () => {
      delete submitData.picture;
      const res = await request(server)
        .post("/collectings/")
        .set("x-auth-token", adminToken)
        .field("name", submitData.name)
        .attach("images", submitData.images)
        .field("description", submitData.description)
        .field("lat", submitData.lat)
        .field("lng", submitData.lng);
      expect(res.status).toBe(400);
      expect(res.text).toBe("Picture required or Invalid picture type");
    });
    it("should return 400 if images is missing", async () => {
      delete submitData.images;
      const res = await request(server)
        .post("/collectings/")
        .set("x-auth-token", adminToken)
        .field("name", submitData.name)
        .attach("picture", submitData.picture)
        .field("description", submitData.description)
        .field("lat", submitData.lat)
        .field("lng", submitData.lng);
      expect(res.status).toBe(400);
      expect(res.text).toBe("Images required or Invalid images type");
    });
  });
});
