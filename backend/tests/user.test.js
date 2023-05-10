require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../models/user");
const mongoose = require("mongoose");
describe("UNIT TEST : Authetication token", () => {
  it("Should generate a valid JWT token", () => {
    const user = new User({
      _id: 1,
    });
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    expect(decoded._id).toBe(user._id.toString());
  });
  it("Should reject because private key is not valid", () => {
    const user = new User({
      _id: 1,
    });
    const token = user.generateAuthToken();
    expect(() => {
      jwt.verify(token, "1234");
    }).toThrow();
  });
  it("Should reject because token is not valid", () => {
    const user = new User({
      _id: 1,
    });
    const token = user.generateAuthToken();
    expect(() => {
      jwt.verify(token, process.env.JWT_PRIVATE_KEY + 1);
    }).toThrow();
  });
});

describe("UNIT TEST : Validate User", () => {
  let user;
  beforeEach(() => {
    user = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: "name name",
      email: "name@asd.com",
      phone: "1234567890",
      address: "address",
      picture: "picture",
      role: "admin",
      password: "password",
    };
  });
  it("Should return null because user is valid", () => {
    const result = validateUser(user);
    expect(result).toBeNull();
  });
  it("Should return error because user id is invalid", () => {
    user._id = "1";
    const result = validateUser(user);
    expect(result).toBe(
      '"_id" with value "' +
        user._id +
        '" fails to match the required pattern: /^[0-9a-fA-F]{24}$/'
    );
  });
  it("Should return null even user id isnt exist", () => {
    delete user._id;
    const result = validateUser(user);
    expect(result).toBeNull();
  });
  it("Should return error because user's name isnt exist ", () => {
    delete user.name;
    const result = validateUser(user);
    expect(result).toBe('"name" is required');
  });
  it("Should return error because user's name is less than 5 characters", () => {
    user.name = "1234";
    const result = validateUser(user);
    expect(result).toBe('"name" length must be at least 5 characters long');
  });
  it("Should return error because user's name is more than 20 characters", () => {
    user.name = new Array(22).join("a");
    const result = validateUser(user);
    expect(result).toBe(
      '"name" length must be less than or equal to 20 characters long'
    );
  });
  it("Should return error because user's email isnt exist ", () => {
    delete user.email;
    const result = validateUser(user);
    expect(result).toBe('"email" is required');
  });
  it("Should return error because user's email is invalid", () => {
    user.email = "1";
    const result = validateUser(user);
    expect(result).toBe('"email" must be a valid email');
  });
  it("Should return error because user's phone isnt exist ", () => {
    delete user.phone;
    const result = validateUser(user);
    expect(result).toBe('"phone" is required');
  });
  it("Should return error because user's phone is less than 10 characters", () => {
    user.phone = "123456789";
    const result = validateUser(user);
    expect(result).toBe('"phone" length must be at least 10 characters long');
  });
  it("Should return error because user's phone is more than 15 characters", () => {
    user.phone = "1234567890123456";
    const result = validateUser(user);
    expect(result).toBe(
      '"phone" length must be less than or equal to 15 characters long'
    );
  });
  it("Should return error because user's address isnt exist ", () => {
    delete user.address;
    const result = validateUser(user);
    expect(result).toBe('"address" is required');
  });
  it("Should return error because user's address is less than 5 characters", () => {
    user.address = "1234";
    const result = validateUser(user);
    expect(result).toBe('"address" length must be at least 5 characters long');
  });
  it("Should return error because user's address is more than 255 characters", () => {
    user.address = new Array(257).join("a");
    const result = validateUser(user);
    expect(result).toBe(
      '"address" length must be less than or equal to 255 characters long'
    );
  });
  it("Should return null even user's picture isnt exist ", () => {
    delete user.picture;
    const result = validateUser(user);
    expect(result).toBeNull();
  });
  it("Should return error because user's picture is less than 5 characters", () => {
    user.picture = "1234";
    const result = validateUser(user);
    expect(result).toBe('"picture" length must be at least 5 characters long');
  });
  it("Should return error because user's picture is more than 1024 characters", () => {
    user.picture = new Array(1027).join("a");
    const result = validateUser(user);
    expect(result).toBe(
      '"picture" length must be less than or equal to 1024 characters long'
    );
  });
  it("Should return error because user's role isnt exist ", () => {
    delete user.role;
    const result = validateUser(user);
    expect(result).toBe('"role" is required');
  });
  it("Should return error because user's role is invalid", () => {
    user.role = "1";
    const result = validateUser(user);
    expect(result).toBe('"role" must be one of [admin, gtf, gc, cs]');
  });
  it("Should return null even user's password isnt exist ", () => {
    delete user.password;
    const result = validateUser(user);
    expect(result).toBeNull();
  });
  it("Should return error because user's password is less than 5 characters", () => {
    user.password = "1234";
    const result = validateUser(user);
    expect(result).toBe('"password" length must be at least 5 characters long');
  });
  it("Should return error because user's password is more than 1024 characters", () => {
    user.password = new Array(1027).join("a");
    const result = validateUser(user);
    expect(result).toBe(
      '"password" length must be less than or equal to 1024 characters long'
    );
  });
});
