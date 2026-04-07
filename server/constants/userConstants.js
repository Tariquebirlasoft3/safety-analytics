// Validation messages
const USER_MESSAGES = {
  NAME_REQUIRED: "Please add a name",
  EMAIL_REQUIRED: "Please add an email",
  EMAIL_INVALID: "Please add a valid email",
  PASSWORD_REQUIRED: "Please add a password",
};

// Validation rules
const USER_RULES = {
  PASSWORD_MIN_LENGTH: 6,
};

// Email regex
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  USER_MESSAGES,
  USER_RULES,
  EMAIL_REGEX,
};
