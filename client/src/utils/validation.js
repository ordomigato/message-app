// Validate value and return true or false
const checkField = (key, value) => {
  switch (key) {
    case "username":
      // must be 6 characters long and be alphanumberic with the first character being a letter
      const regexUsername = /^[a-zA-Z][a-zA-Z0-9]{6,}$/;
      return regexUsername.test(String(value));
    case "email":
      const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regexEmail.test(String(value).toLowerCase());
    case "pw":
      // must be 6 characters long and can contain alphanumeric and special characters
      const regexPw = /[A-Za-z0-9_@./#&+-]{6,}/;
      return regexPw.test(String(value));
    default:
      return true;
  }
};

// check all keys in an object and check if all are true
const checkAllFields = object => {
  for (let key in object) {
    if (object[key] === false) return false;
  }
  return true;
};

export { checkField, checkAllFields };
