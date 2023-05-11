const request = require("supertest");
const server = require("./server");
const { User } = require("../../models/user");
describe("INTEGRATION TEST : User route", () => {
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
      name: "test user",
      email: "test@user.com",
      phone: "0123456789",
      password: "12345",
      address: "test address",
    };
  });

  afterEach(async () => {
    await User.deleteMany({ role: { $ne: "admin" } });
  });
  describe("POST /users/signup - gtf member signup", () => {
    it("should create a new user", async () => {
      const res = await request(server).post("/users/signup").send(submitData);
      expect(res.status).toBe(200);
    });
    it("should return 400 if user already exists", async () => {
      await request(server).post("/users/signup").send(submitData);
      const res = await request(server).post("/users/signup").send(submitData);
      expect(res.status).toBe(400);
    });
    it("should return 400 if submit data is email invalid", async () => {
      submitData.email = "invalid email";
      const res = await request(server).post("/users/signup").send(submitData);
      expect(res.text).toBe('"email" must be a valid email');
      expect(res.status).toBe(400);
    });
    it("should return 400 if submit data email is missing", async () => {
      delete submitData.email;
      const res = await request(server).post("/users/signup").send(submitData);
      expect(res.text).toBe('"email" is required');
      expect(res.status).toBe(400);
    });
    it("should return 400 if submit data phone is missing", async () => {
      delete submitData.phone;
      const res = await request(server).post("/users/signup").send(submitData);
      expect(res.text).toBe('"phone" is required');
      expect(res.status).toBe(400);
    });
    it("should return 400 if submit data phone is invalid", async () => {
      submitData.phone = "01234567";
      const res = await request(server).post("/users/signup").send(submitData);
      expect(res.text).toBe(
        '"phone" length must be at least 10 characters long'
      );
      expect(res.status).toBe(400);
    });
    it("should return 400 if submit data password is missing", async () => {
      delete submitData.password;
      const res = await request(server).post("/users/signup").send(submitData);
      expect(res.text).toBe('"password" is required');
      expect(res.status).toBe(400);
    });
    it("should return 400 if submit data password is invalid", async () => {
      submitData.password = "1234";
      const res = await request(server).post("/users/signup").send(submitData);
      expect(res.text).toBe(
        '"password" length must be at least 5 characters long'
      );
      expect(res.status).toBe(400);
    });
    it("should return 400 if submit data address is missing", async () => {
      delete submitData.address;
      const res = await request(server).post("/users/signup").send(submitData);
      expect(res.text).toBe('"address" is required');
      expect(res.status).toBe(400);
    });
    it("should return 400 if submit data address is invalid", async () => {
      submitData.address = "1234";
      const res = await request(server).post("/users/signup").send(submitData);
      expect(res.text).toBe(
        '"address" length must be at least 5 characters long'
      );
      expect(res.status).toBe(400);
    });
    it("should return 400 if submit data name is missing", async () => {
      delete submitData.name;
      const res = await request(server).post("/users/signup").send(submitData);
      expect(res.text).toBe('"name" is required');
      expect(res.status).toBe(400);
    });
    it("should return 400 if submit data name is invalid", async () => {
      submitData.name = "1234";
      const res = await request(server).post("/users/signup").send(submitData);
      expect(res.text).toBe('"name" length must be at least 5 characters long');
      expect(res.status).toBe(400);
    });
  });
  describe("POST /users/admin - create gc and cs account", () => {
    it("should return 401 if admin token is invalid", async () => {
      const res = await request(server)
        .post("/users/admin")
        .set("x-auth-token", "invalid token")
        .send(submitData);
      expect(res.text).toBe("Invalid token");
      expect(res.status).toBe(400);
    });
    it("should return 401 if admin token is not admin", async () => {
      const login = { email: "test1@user.net", password: "12345" };
      await request(server).post("/users/signup").send({
        name: "test user",
        email: login.email,
        phone: "0123456789",
        password: login.password,
        address: "test address",
      });
      const res = await request(server).post("/auth/login").send(login);
      const token = res.headers["x-auth-token"];
      const res2 = await request(server)
        .post("/users/admin")
        .send(submitData)
        .set("x-auth-token", token);
      expect(res2.status).toBe(403);
      expect(res2.text).toBe("Not allowed");
    });
    it("should successfully create a new user", async () => {
      const res = await request(server)
        .post("/users/admin")
        .set("x-auth-token", adminToken)
        .send({ ...submitData, role: "gc" });
      expect(res.text).toBe("Successfully Created user");
      expect(res.status).toBe(200);
    });
    it("should return 400 if submit data is invalid", async () => {
      delete submitData.name;
      const res = await request(server)
        .post("/users/admin")
        .set("x-auth-token", adminToken)
        .send({ ...submitData, role: "gc" });
      expect(res.text).toBe('"name" is required');
      expect(res.status).toBe(400);
    });
  });
  describe("POST /users/login - login", () => {
    beforeEach(async () => {
      await request(server).post("/users/signup").send(submitData);
    });
    it("should successfully loggin user to the system", async () => {
      const res = await request(server).post("/auth/login").send({
        email: submitData.email,
        password: submitData.password,
      });
      expect(res.text).toBe("Successfully logged in");
      expect(res.status).toBe(200);
    });
    it("should return 400 if email is missing", async () => {
      delete submitData.email;
      const res = await request(server).post("/auth/login").send(submitData);
      expect(res.text).toBe("Invalid email address");
      expect(res.status).toBe(400);
    });
    it("should return 400 if password is missing", async () => {
      delete submitData.password;
      const res = await request(server).post("/auth/login").send(submitData);
      expect(res.text).toBe("Invalid password");
      expect(res.status).toBe(400);
    });
    it("should return 400 if email is invalid", async () => {
      submitData.email = "invalid email";
      const res = await request(server).post("/auth/login").send(submitData);
      expect(res.text).toBe("Invalid email address");
      expect(res.status).toBe(400);
    });
    it("should return 400 if password is invalid", async () => {
      submitData.password = "1234";
      const res = await request(server).post("/auth/login").send(submitData);
      expect(res.text).toBe("Invalid password");
      expect(res.status).toBe(400);
    });
  });
});
