module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "This field is required.";
  }
  if (email.trim() === "") {
    errors.email = "This field is required.";
  } else {
    // regEx to test for valid email addy:
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Invalid email address.";
    }
  }
  if (password === "") {
    errors.password = "This field is required.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords don't match.";
  }

  return {
    errors,
    // valid if errors are < 1:
    valid: Object.keys(errors).length < 1,
  };
};
