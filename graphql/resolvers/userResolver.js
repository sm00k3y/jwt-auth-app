const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user");

module.exports = {
  Query: {
    hello: () => "Hello!",
    users: async () => {
      const users = await UserModel.find();
      const retUsers = users.map((user) => {
        return {
          _id: user.id,
          email: user.email,
        };
      });
      console.log(retUsers);
      // can also just return users here (or maybe not bc of id and _doc._id ???)
      return retUsers;
    },
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const userFromDB = await UserModel.findOne({ email: email });
      console.log(userFromDB);
      if (userFromDB) {
        const errMsg = "USER with this email ALREADY EXITS";
        return errMsg;
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel({
        email: email,
        password: hashedPassword,
      });

      let success = true;
      await user.save((err) => {
        if (err) {
          console.log("ERROR: SAVING USER TO THE DATABASE\n", err);
          success = false;
        }
        console.log("Successfully added user to MongoDB");
      });

      if (success) return "Successfully added user to MongoDB";
      else return "ERROR SAVING USER TO THE DATABASE";
    },

    login: async (_, { email, password }) => {
      const dbUser = await UserModel.findOne({ email: email });
      let msg;
      if (!dbUser) {
        msg = "User Not found!";
        // return msg;
        throw new Error(msg);
      }

      const passCheck = await bcrypt.compare(password, dbUser.password);
      if (!passCheck) {
        msg = "Wrong password!";
        // return msg;
        throw new Error(msg);
      }

      // Successful Login
      const token = jwt.sign({ userId: dbUser.id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });

      // const loginResponse = { accessToken: token };
      return { accessToken: token };
    },
  },
};
