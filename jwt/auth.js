const jwt = require("jsonwebtoken");

const createAccessToken = (dbUser) => {
  return jwt.sign({ userId: dbUser.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15min",
  });
};

const createRefreshToken = (dbUser) => {
  return jwt.sign({ userId: dbUser.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "12h",
  });
};

const setRefreshToken = (res, token) => {
  res.cookie(process.env.REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
  });
};

module.exports = { createAccessToken, createRefreshToken, setRefreshToken };
