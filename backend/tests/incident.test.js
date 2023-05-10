const { validateIncident } = require("../models/incident");
const mongoose = require("mongoose");

describe("UNIT TEST : Validate Incident", () => {
  let incident;
  beforeEach(() => {
    incident = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      user: new mongoose.Types.ObjectId().toHexString(),
      title: "Test col",
      location: {
        lat: 0,
        lng: 0,
      },
      description: "Test desc",
      picture: "Test desc",
    };
  });
  it("should return null if incident is valid", () => {
    const result = validateIncident(incident);
    expect(result).toBeNull();
  });
  it("should return error if incident id is invalid", () => {
    incident._id = "1";
    const result = validateIncident(incident);
    expect(result).toBe(
      '"_id" with value "' +
        incident._id +
        '" fails to match the required pattern: /^[0-9a-fA-F]{24}$/'
    );
  });
  it("should return null if incident id isnt exist", () => {
    delete incident._id;
    const result = validateIncident(incident);
    expect(result).toBeNull();
  });
  it("should return error if incident user is invalid", () => {
    incident.user = "1";
    const result = validateIncident(incident);
    expect(result).toBe(
      '"user" with value "' +
        incident.user +
        '" fails to match the required pattern: /^[0-9a-fA-F]{24}$/'
    );
  });
  it("should return error if incident user isnt exist", () => {
    delete incident.user;
    const result = validateIncident(incident);
    expect(result).toBe('"user" is required');
  });
  it("should return error if incident user is invalid", () => {
    incident.user = "1";
    const result = validateIncident(incident);
    expect(result).toBe(
      '"user" with value "' +
        incident.user +
        '" fails to match the required pattern: /^[0-9a-fA-F]{24}$/'
    );
  });
  it("should return error if incident title isnt exist", () => {
    delete incident.title;
    const result = validateIncident(incident);
    expect(result).toBe('"title" is required');
  });
  it("should return error if incident title is less than 5 characters", () => {
    incident.title = "1234";
    const result = validateIncident(incident);
    expect(result).toBe('"title" length must be at least 5 characters long');
  });
  it("should return error if incident title is more than 20 characters", () => {
    incident.title = new Array(22).join("a");
    const result = validateIncident(incident);
    expect(result).toBe(
      '"title" length must be less than or equal to 20 characters long'
    );
  });
  it("should return error if incident description isnt exist", () => {
    delete incident.description;
    const result = validateIncident(incident);
    expect(result).toBe('"description" is required');
  });
  it("should return error if incident description is less than 5 characters", () => {
    incident.description = "1234";
    const result = validateIncident(incident);
    expect(result).toBe(
      '"description" length must be at least 5 characters long'
    );
  });
  it("should return error if incident description is more than 1024 characters", () => {
    incident.description = new Array(1027).join("a");
    const result = validateIncident(incident);
    expect(result).toBe(
      '"description" length must be less than or equal to 1024 characters long'
    );
  });
  it("should return null if incident picture isnt exist", () => {
    delete incident.picture;
    const result = validateIncident(incident);
    expect(result).toBeNull();
  });
  it("should return error if incident picture is less than 5 characters", () => {
    incident.picture = "1234";
    const result = validateIncident(incident);
    expect(result).toBe('"picture" length must be at least 5 characters long');
  });
  it("should return error if incident picture is more than 1024 characters", () => {
    incident.picture = new Array(1027).join("a");
    const result = validateIncident(incident);
    expect(result).toBe(
      '"picture" length must be less than or equal to 1024 characters long'
    );
  });
  it("should return error if incident location isnt exist", () => {
    delete incident.location;
    const result = validateIncident(incident);
    expect(result).toBe('"location" is required');
  });
  it("should return error if incident location is invalid", () => {
    incident.location = "1";
    const result = validateIncident(incident);
    expect(result).toBe('"location" must be of type object');
  });
  it("should return error if incident location lat is invalid", () => {
    incident.location.lat = "a";
    const result = validateIncident(incident);
    expect(result).toBe('"location.lat" must be a number');
  });
  it("should return error if incident location lng is invalid", () => {
    incident.location.lng = "a";
    const result = validateIncident(incident);
    expect(result).toBe('"location.lng" must be a number');
  });
  it("should return error if incident location lat is less than -90", () => {
    incident.location.lat = -91;
    const result = validateIncident(incident);
    expect(result).toBe('"location.lat" must be greater than or equal to -90');
  });
  it("should return error if incident location lat is greater than 90", () => {
    incident.location.lat = 91;
    const result = validateIncident(incident);
    expect(result).toBe('"location.lat" must be less than or equal to 90');
  });

  it("should return error if incident location lng is less than -180", () => {
    incident.location.lng = -181;
    const result = validateIncident(incident);
    expect(result).toBe('"location.lng" must be greater than or equal to -180');
  });
  it("should return error if incident location lng is greater than 180", () => {
    incident.location.lng = 181;
    const result = validateIncident(incident);
    expect(result).toBe('"location.lng" must be less than or equal to 180');
  });
});
