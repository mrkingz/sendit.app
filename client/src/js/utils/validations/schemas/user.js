import Joi from "joi";
import formatError from "../errorFormatter";

/**
 * Validate email address
 *
 * @static
 * @returns {function} Returns an express middleware function that handles the validation
 * @method validateEmail
 * @memberof UserValidator
 */
const validateEmail = () => {
  return (req, res, next) => {
    return this.validate(req, res, next, Joi.object().keys(getEmailSchema()));
  };
};

/**
 * Validates user details update
 *
 * @static
 * @param {string} option a string representing the validation type
 * @returns {function} Returns an express middleware function that handles the validation
 * @memberof UserValidator
 * @method validateUserUpdate
 */
const validateUserUpdate = option => {
  return {
    name: getNameSchema(),
    phoneNumber: getPhoneSchema(),
    password: getPasswordSchema(option),
    reset: getPasswordSchema(option)
  };
};

/**
 * Format phone to include country code
 *
 * @static
 * @param {string} phoneNumber
 * @param {string} countryCode
 * @returns {string} the formated phone number
 * @memberof UserValidator
 */
const formatPhoneNumber = (phoneNumber, countryCode) => {
  countryCode = countryCode.replace("009", "").replace();
  countryCode = !countryCode.startsWith("+") ? `+${countryCode}` : countryCode;
  return countryCode.concat(phoneNumber.substr(-10));
};

/**
 * Create user validation schema
 *
 * @static
 * @returns {object} the user validation schema
 * @method getUserSchema
 * @memberof UserValidator
 */
const getSignUpSchema = () => {
  /**
   * Remember to keep maintain the order of the schemas
   * according to how the fields appear in the form.
   * This is because we need to focus the cursor on the first
   *  field in the error list
   */
  return Joi.object()
    .keys(getNameSchema())
    .keys(getEmailSchema())
    .keys(getPasswordSchema());
};

/**
 * Create email validation schema
 *
 * @static
 * @returns {object} the email validation schema
 * @method getEmailSchema
 * @memberof UserValidator
 */
const getEmailSchema = () => {
  return {
    email: Joi.string()
      .trim()
      .required()
      .email()
      .max(100)
      .label("Email address")
      .lowercase()
  };
};

/**
 * Create phone number validation schema
 *
 * @static
 * @param {obj} obj
 * @returns {object} the phone number validation schema
 * @method getPhoneSchema
 * @memberof UserValidator
 */
const getPhoneSchema = (obj = {}) => {
  const { str, key, requestMethod } = obj,
    label = `${str ? str.concat(" ") : ""}phone number`,
    codeLabel = "Country code";
  const schema = {
    countryCode: Joi.string()
      .required()
      .regex(/^(([0]{2}[9]{1}|[+]{0,1})[0-9]{1,3})$/)
      .label(codeLabel)
      .error(errors => formatError(errors, codeLabel)),
    [key || "phoneNumber"]: Joi.string()
      .required()
      .max(50)
      .regex(
        /(^(([+]{0,1}|([0]{2}[9]{1}))[1-9]{1,3}|[0]{0,1})[7-9]{1}[0-1]{1}[0-9]{8})$/
      )
      .label(label)
      .error(errors => formatError(errors, label))
  };
  if (requestMethod === "POST") {
    const vCodeLabel = "Verification code";
    schema.code = Joi.string()
      .min(6)
      .max(6)
      .required()
      .label(vCodeLabel)
      .error(errors => formatError(errors, vCodeLabel));
  }
  return schema;
};

/**
 * Create password validation schema
 *
 * @static
 * @param {string} option
 * @returns {object} the password validation schema
 * @method getPasswordSchema
 * @memberof UserValidator
 */
const getPasswordSchema = option => {
  const obj = {
    password: Joi.string()
      .required()
      .min(8)
      .max(60)
  };
  // Remember users are not authenticated when recovering forgotten password
  // So, we will indentify this user with email address;
  // as such, we need to make sure we validate email address also
  if (option === "reset") {
    obj.email = getEmailSchema().email;
  }
  return obj;
};

/**
 * Get name validation schema
 *
 * @static
 * @returns {object} the names validation schema keys
 * @method getNameSchema
 * @memberof UserValidator
 */
const getNameSchema = () => {
  const exp = /^[\w'\-,.][^0-9_¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  const name = Joi.string()
    .required()
    .max(100)
    .regex(exp)
    .lowercase()
    .error(errors => formatError(errors));
  return { firstname: name, lastname: name };
};

/**
 * Validate user authentication credentials
 *
 * @static
 * @returns {function} An express middleware function that handles the validation
 * @method validateSignin
 * @memberof UserValidator
 */
const getSignInSchema = () => {
  const message = errors => {
    const error = errors[0];
    return error.type === "any.required"
      ? "E-mail address and password are required"
      : error;
  };
  return Joi.object().keys({
    email: Joi.string()
      .lowercase()
      .required()
      .error(message),
    password: Joi.string()
      .required()
      .error(message)
  });
};

export default {
  getSignUpSchema,
  getSignInSchema,
  getPhoneSchema,
  getPasswordSchema
};
