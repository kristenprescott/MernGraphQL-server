const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET } = require("../../config");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    // register(parents, args, context, info) // <<--- all avail params
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: Validate user data
      // TODO: Make sure user doesn't exist already
      // TODO: Hash pw before storing & create auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET,
        { expiresIn: `1h` }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

/*
TEST REGISTER:
{
  "data": {
    "register": {
      "id": "60ee451a59f904ec7e82e983",
      "email": "user@email.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWU0NTFhNTlmOTA0ZWM3ZTgyZTk4MyIsImVtYWlsIjoidXNlckBlbWFpbC5jb20iLCJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2MjYyMjc5OTQsImV4cCI6MTYyNjIzMTU5NH0.0ktKpF10byVmvJf4MUlyBaSB7I_YFdHRnwMiIuYdIJg",
      "username": "user",
      "createdAt": "2021-07-14T01:59:54.837Z"
    }
  }
}
*/

// // GET all users:
// module.exports = {
//   Query: {
//     async getUsers() {
//       try {
//         const users = await User.find();
//         return users;
//       } catch (err) {
//         throw new Error(err);
//       }
//     },
//   },
// };
