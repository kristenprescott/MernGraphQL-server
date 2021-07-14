const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

module.exports = (context) => {
  // context = { ...headers}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ...(tokem)
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError(
          "Your token is no longer valid - you may need to log back in."
        );
      }
    }
    throw new Error("Authentication token must be 'Bearer <token>");
  }
  throw new Error("Authorization header must be provided.");
};
