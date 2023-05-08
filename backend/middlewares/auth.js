const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

async function auth(req, res, next) {
  const result = authorize(req);
  if (result.error) {
    const { status, message } = result.error;
    return res.status(status).send(message);
  }
  const exist = await User.findById(result._id);
  if (!exist) return res.status(400).send("Invalid User Token");

  result.role = exist.role;

  req.user = result;
  next();
}

function authorize(req, role) {
  const token = req.header("x-auth-token");
  if (!token)
    return {
      error: { status: 401, message: "Acced Denied, no token provided" },
    };

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (role && decoded.role !== role)
      return {
        error: {
          status: 403,
          message: "Access denied, not have enough access",
        },
      };
    return decoded;
  } catch (err) {
    return { error: { status: 400, message: "Invalid token" } };
  }
}

module.exports.auth = auth;
