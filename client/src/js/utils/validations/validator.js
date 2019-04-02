/**
 * @description validate form fields
 *
 * @param {string} type the form to validate
 * @param {object} data the component state containg the fields to validate
 * @returns {object} an object with the error details
 */
const validator = (type, data) => {
  let errors;
  if (type === "signup") {
    errors = validateSignUp(data);
  } else if (type === "signin") {
    errors = validateSignIn(data);
  }

  return {
    hasError: Object.keys(errors).length > 0,
    error: errors
  };
};
/**
 * @description validate email address
 *
 * @param {string} email
 * @returns
 */
const isEmail = email => {
  const exp = /([a-zA-Z0-9_\-.]+)@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9]+\.)+))([a-zA-Z]{2,4}|[0-9]{1.3})/;
  return email.match(exp);
};

/**
 * @description validate name
 *
 * @param {string} name
 * @returns
 */
const validateName = name => {
  const exp = /^[\w'\-,.][^0-9_¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  return name.match(exp);
};

/**
 *
 *
 * @returns {object} object containing error details as properties or empty object
 */
const validateSignUp = formData => {
  let { errors, ...data } = formData;
  Object.keys(data).forEach(item => {
    data[item] = formData[item].trim();
  });

  if (!data.firstname) {
    errors.firstname = "First name cannot be empty";
  } else if (!validateName(data.firstname)) {
    errors.firstname = "Please, enter a valid first name";
  } else if (!data.lastname) {
    errors.lastname = "Last name cannot be empty";
  } else if (!validateName(data.lastname)) {
    errors.lastname = "Please, enter a valid last name";
  } else if (!data.email) {
    errors.email = "Email address cannot be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Please, enter a valid email address";
  } else if (!data.password) {
    errors.password = "Password cannot be empty";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  return errors;
};

/**
 *
 *
 * @returns {object} object containing error details as properties or empty object
 */
const validateSignIn = formData => {
  let { errors, ...data } = formData;
  Object.keys(data).forEach(item => {
    data[item] = formData[item].trim();
  });

  if (!data.email) {
    errors.email = "Please, enter your email address";
  } else if (!data.password) {
    errors.password = "Please, enter your password";
  }
  return errors;
};
export default validator;
