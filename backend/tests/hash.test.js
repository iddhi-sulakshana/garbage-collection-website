const { encrypt, validPassword } = require("../utils/hash");
const password = "123456";
let hash = "";
describe("UNIT TEST : Password encryption", () => {
  it("should encrypt password", async () => {
    hash = await encrypt(password);
    expect(hash).not.toBe(password);
  });
  it("should validate password", async () => {
    const isValid = await validPassword(password, hash);
    expect(isValid).toBe(true);
  });
  it("should not validate password", async () => {
    const isValid = await validPassword("1234567", hash);
    expect(isValid).toBe(false);
  });
});
