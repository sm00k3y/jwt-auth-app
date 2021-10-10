const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user");
const auth = require("../../jwt/auth");

module.exports = {
  Query: {
    hello: () => "Hello!",
    bye: (_, __, { auth }) => {
      if (!auth.userId) {
        return "NOT AUTHENTICATED";
      } else {
        return `BYEE :) id: ${auth.userId} email: ${auth.userEmail}`;
      }
    },
    users: async () => {
      const users = await UserModel.find();
      const retUsers = users.map((user) => {
        return {
          _id: user.id,
          email: user.email,
        };
      });
      // can also just return users here (or maybe not bc of id and _doc._id ???)
      return retUsers;
    },
    refreshToken: async (_, __, { req, res }) => {
      if (!req.headers.cookie) {
        console.log("No token in cookies found....");
        return { accessToken: "" };
        // throw new Error("Refresh Token not found in the cookies");
      }
      console.log(process.env.REFRESH_COOKIE_NAME);

      const tokenArray = req.headers.cookie.split(" ");
      const foundToken = tokenArray.find((el) =>
        el.includes(process.env.REFRESH_COOKIE_NAME)
      );
      const refreshToken = foundToken.slice(
        process.env.REFRESH_COOKIE_NAME.length + 1
      );

      let validRefresh;
      try {
        validRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      } catch (err) {
        console.log("Error validating the token");
        return { accessToken: "" };
        // throw new Error("Error Validating the token...");
      }

      if (!validRefresh) {
        throw new Error("Empty Token");
      }

      const dbUser = await UserModel.findOne({ _id: validRefresh.userId });

      // this is not possible but we'll check anyways
      if (!dbUser) {
        throw new Error("No user found for this token!");
      }

      if (dbUser.tokenVersion !== validRefresh.tokenVersion) {
        console.log("Wrong token version");
        return { accessToken: "" };
        // throw new Error("Token version invalid!");
      }

      const newAccessToken = auth.createAccessToken(dbUser);
      const newRefreshToken = auth.createRefreshToken(dbUser);
      auth.setRefreshToken(res, newRefreshToken);
      return { accessToken: newAccessToken };
    },
  },

  Mutation: {
    register: async (_, { email, password }) => {
      const userFromDB = await UserModel.findOne({ email: email });
      if (userFromDB) {
        const errMsg = "USER with this email ALREADY EXITS";
        return { userExists: true };
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel({
        email: email,
        password: hashedPassword,
      });

      await user.save((err) => {
        if (err) {
          throw new Error("Error saving user to the database");
        }
      });
      return { userExists: false };
    },

    login: async (_, { email, password }, { res }) => {
      const dbUser = await UserModel.findOne({ email: email });
      let msg;
      if (!dbUser) {
        msg = "User Not found!";
        return { accessToken: "" };
        // throw new Error(msg);
      }

      const passCheck = await bcrypt.compare(password, dbUser.password);
      if (!passCheck) {
        msg = "Wrong password!";
        return { accessToken: "" };
        // throw new Error(msg);
      }

      // Successful Login
      const accessToken = auth.createAccessToken(dbUser);
      const refreshToken = auth.createRefreshToken(dbUser);
      auth.setRefreshToken(res, refreshToken);
      return { accessToken: accessToken };
    },

    revokeRefreshToken: async (_, { userId }) => {
      try {
        await UserModel.findOneAndUpdate(
          { _id: userId },
          { $inc: { tokenVersion: 1 } }
        );
      } catch (err) {
        throw new Error(
          "Error updating user token version - no user found for this ID"
        );
      }
      return true;
    },
  },
};
