const saveImage = require("../utils/saveImage");
describe("UNIT TEST : Save image", () => {
  it("should save image", async () => {
    const image = {
      mimetype: "image/png",
      mv: jest.fn(),
    };
    const fileName = await saveImage(image, "tests/test");
    expect(fileName).toBe("tests/test.png");
    expect(image.mv).toHaveBeenCalled();
  });
  it("should throw error", async () => {
    const image = {
      mimetype: "image/png",
      mv: jest.fn(() => {
        throw new Error("Error");
      }),
    };
    await expect(saveImage(image, "tests/test")).rejects.toThrow();
  });
});
