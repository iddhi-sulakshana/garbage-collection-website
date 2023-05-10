const { validateCollecting } = require("../models/collecting");
const mongoose = require("mongoose");

describe("UNIT TEST : Validate Collecting", () => {
  let collecting;
  beforeEach(() => {
    collecting = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: "Test col",
      location: {
        lat: 0,
        lng: 0,
      },
      description: "Test desc",
      picture: "Test desc",
      images: ["Testimg"],
    };
  });
  it("should return null if collecting is valid", () => {
    const result = validateCollecting(collecting);
    expect(result).toBeNull();
  });
  it("should return error if collecting id is invalid", () => {
    collecting._id = "1";
    const result = validateCollecting(collecting);
    expect(result).toBe(
      '"_id" with value "' +
        collecting._id +
        '" fails to match the required pattern: /^[0-9a-fA-F]{24}$/'
    );
  });
  it("should return null if collecting id isnt exist", () => {
    delete collecting._id;
    const result = validateCollecting(collecting);
    expect(result).toBeNull();
  });
  it("should return error if collecting name isnt exist", () => {
    delete collecting.name;
    const result = validateCollecting(collecting);
    expect(result).toBe('"name" is required');
  });
  it("should return error if collecting name is less than 5 characters", () => {
    collecting.name = "1234";
    const result = validateCollecting(collecting);
    expect(result).toBe('"name" length must be at least 5 characters long');
  });
  it("should return error if collecting name is more than 20 characters", () => {
    collecting.name = new Array(22).join("a");
    const result = validateCollecting(collecting);
    expect(result).toBe(
      '"name" length must be less than or equal to 20 characters long'
    );
  });
  it("should return error if collecting description isnt exist", () => {
    delete collecting.description;
    const result = validateCollecting(collecting);
    expect(result).toBe('"description" is required');
  });
  it("should return error if collecting description is less than 5 characters", () => {
    collecting.description = "1234";
    const result = validateCollecting(collecting);
    expect(result).toBe(
      '"description" length must be at least 5 characters long'
    );
  });
  it("should return error if collecting description is more than 1024 characters", () => {
    collecting.description = new Array(1027).join("a");
    const result = validateCollecting(collecting);
    expect(result).toBe(
      '"description" length must be less than or equal to 1024 characters long'
    );
  });
  it("should return null even if collecting picture isnt exist", () => {
    delete collecting.picture;
    const result = validateCollecting(collecting);
    expect(result).toBeNull();
  });
  it("should return error if collecting picture is less than 5 characters", () => {
    collecting.picture = "1234";
    const result = validateCollecting(collecting);
    expect(result).toBe('"picture" length must be at least 5 characters long');
  });
  it("should return error if collecting picture is more than 1024 characters", () => {
    collecting.picture = new Array(1027).join("a");
    const result = validateCollecting(collecting);
    expect(result).toBe(
      '"picture" length must be less than or equal to 1024 characters long'
    );
  });
  it("should return null if collecting images isnt exist", () => {
    delete collecting.images;
    const result = validateCollecting(collecting);
    expect(result).toBeNull();
  });
  it("should return error if collecting images is no an array", () => {
    collecting.images = "1234";
    const result = validateCollecting(collecting);
    expect(result).toBe('"images" must be an array');
  });
  it("should return error if collecting images is empty", () => {
    collecting.images = [];
    const result = validateCollecting(collecting);
    expect(result).toBe('"images" must contain at least 1 items');
  });
  it("should return error if collecting images is more than 10 images", () => {
    collecting.images = new Array(12).fill("Testimg");
    const result = validateCollecting(collecting);
    expect(result).toBe('"images" must contain less than or equal to 5 items');
  });
  it("should return error if collecting location isnt exist", () => {
    delete collecting.location;
    const result = validateCollecting(collecting);
    expect(result).toBe('"location" is required');
  });
  it("should return error if collecting location lat isnt exist", () => {
    delete collecting.location.lat;
    const result = validateCollecting(collecting);
    expect(result).toBe('"location.lat" is required');
  });
  it("should return error if collecting location lng isnt exist", () => {
    delete collecting.location.lng;
    const result = validateCollecting(collecting);
    expect(result).toBe('"location.lng" is required');
  });
  it("should return error if collecting location lat is not a number", () => {
    collecting.location.lat = "asd";
    const result = validateCollecting(collecting);
    expect(result).toBe('"location.lat" must be a number');
  });
  it("should return error if collecting location lng is not a number", () => {
    collecting.location.lng = "asd";
    const result = validateCollecting(collecting);
    expect(result).toBe('"location.lng" must be a number');
  });
  it("should return error if collecting location lat is less than -90", () => {
    collecting.location.lat = -91;
    const result = validateCollecting(collecting);
    expect(result).toBe('"location.lat" must be greater than or equal to -90');
  });
  it("should return error if collecting location lat is more than 90", () => {
    collecting.location.lat = 91;
    const result = validateCollecting(collecting);
    expect(result).toBe('"location.lat" must be less than or equal to 90');
  });
  it("should return error if collecting location lng is less than -180", () => {
    collecting.location.lng = -181;
    const result = validateCollecting(collecting);
    expect(result).toBe('"location.lng" must be greater than or equal to -180');
  });
  it("should return error if collecting location lng is more than 180", () => {
    collecting.location.lng = 181;
    const result = validateCollecting(collecting);
    expect(result).toBe('"location.lng" must be less than or equal to 180');
  });
});
