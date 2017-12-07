module.exports = function (username, password) {
  let user = {
    username: "",
    password: "",

    toString: function () {
      return `user -> username: ${this.username}, password: ${this.password}`;
    },

    validateUsername: function () {
      let errors = [];

      if (this.username == "") { errors.push("Username cannot be empty."); }
      if (this.username.includes(" ")) { errors.push("No whitespace allowed in username."); }
      if (this.username.length > 8) { errors.push("Username cannot be more than 8 chars."); }
      if (this.username.length < 3) { errors.push("Username must be at least 3 characters long.") }

      return errors;
    },

    validatePassword: function () {
      let errors = [];

      if (this.password == "") { errors.push("Password cannot be empty."); }
      if (this.password.includes(" ")) { errors.push("No whitespace allowed in password."); }
      if (this.password.length < 3) { errors.push("Password must be at least 3 characters long.") }

      return errors;
    },

    validateUser: function () {
      let errors = {
        hasErrors: false
      };

      errors.username = this.validateUsername();
      errors.password = this.validatePassword();

      if (errors.username.length > 0 || errors.password.length > 0) {
        errors.hasErrors = true;
      }

      return errors;
    }
  };

  if (username !== undefined) { user.username = username; }
  if (password !== undefined) { user.password = password; }

  return user;
};
