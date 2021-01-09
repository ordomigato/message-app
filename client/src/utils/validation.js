// Validate value and return true or false
const checkField = (key, value) => {
  // Error msgs
  const usernameLengthError = "Must be at least 6 characters long";
  const emailFormatError = "Email is not properly formatted";
  const passwordLengthError = "Must be at least 6 characters long";

  // Regex
  const regexUsername = /^[a-zA-Z][a-zA-Z0-9]{6,}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPw = /[A-Za-z0-9_@./#&+-]{6,}/;

  switch (key) {
    case "username":
      const usernameIsValid = regexUsername.test(String(value));
      return {
        isSuccess: usernameIsValid,
        errorMsg: usernameIsValid ? null : usernameLengthError,
      };
    case "email":
      const emailIsValid = regexEmail.test(String(value));
      return {
        isSuccess: emailIsValid,
        errorMsg: emailIsValid ? null : emailFormatError,
      };
    case "pw":
      const pwIsValid = regexPw.test(String(value));
      return {
        isSuccess: pwIsValid,
        errorMsg: pwIsValid ? null : passwordLengthError,
      };
    default:
      return {
        isSuccess: true,
        errorMsg: null,
      };
  }
};

// Check all keys in an object and see if all are true
const checkAllFields = object => {
  return Object.values(object).every(item => item.bool === true);
};

export { checkField, checkAllFields };
