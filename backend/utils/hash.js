const bcrypt = require("bcrypt");

async function encrypt(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
async function validPassword(original, hashed) {
  return await bcrypt.compare(original, hashed);
}

module.exports.encrypt = encrypt;
module.exports.validPassword = validPassword;
