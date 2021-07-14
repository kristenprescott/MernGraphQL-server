const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const { SECRET } = require("../../config");
const User = require("../../models/User");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET,
    { expiresIn: `24h` }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Invalid input.", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found.";
        throw new UserInputError("User not found.", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Invalid credentials.";
        throw new UserInputError("Invalid credentials.", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    // register(parents, args, context, info) // <<--- all avail. params
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // Make sure user doesn't exist already
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username already exists.", {
          errors: {
            username: "This username already exists.",
          },
        });
      }

      // Hash pw before storing & create auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
