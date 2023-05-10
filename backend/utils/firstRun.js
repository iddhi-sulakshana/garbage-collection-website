const { User } = require("../models/user");
const { encrypt } = require("./hash");
module.exports = async () => {
  const user = await User.findOne({ role: "admin" });
  if (user) return;
  const password = await encrypt("12345");
  const admin = new User({
    name: "Web Master",
    email: "admin@cmc.lk",
    phone: "0712345678",
    address: "Colombo",
    role: "admin",
    password,
  });
  try {
    await admin.save();
  } catch (ex) {
    console.log(ex);
  }
};
