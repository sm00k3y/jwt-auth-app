const jwt = require("jsonwebtoken");

const isAuth = (req) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    // throw new Error("Not authenticated");
    return { userId: null, userEmail: null };
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    // throw new Error("No token passed!");
    return { userId: null, userEmail: null };
  }

  // const exp = jwt.decode(token).exp;
  // if (!exp) {
  //   return { tokenExpired: false, userId: null };
  // }

  // if (exp < Date.now() / 1000) {
  //   return { tokenExpired: true, userId: null };
  // }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // console.log(payload);
  } catch (err) {
    console.log(err);
    // throw new Error("TOKEN UNACCEPTED");
    return { userId: null, userEmail: null };
  }

  return {
    userId: payload.userId,
    userEmail: payload.userEmail,
  };
};

module.exports = isAuth;
