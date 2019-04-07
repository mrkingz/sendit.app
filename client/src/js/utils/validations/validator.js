import Joi from "joi";
import UserSchemas from "./schemas/user";
import ParcelSchemas from "./schemas/parcel";

const validator = async (type, data) => {
  let result;
  Object.keys(data).forEach(item => {
    data[item] = data[item] ? data[item].trim() : data[item];
  });
  await Joi.validate(
    data,
    getSchema(type),
    {
      abortEarly: false
    },
    (err, fields) => {
      if (err) {
        const errors = {};
        err.details.forEach(err => {
          errors[err.path[0]] =
            errors[err.path[0]] || err.message.replace(/"/g, "");
        });
        result = { hasError: true, fields, errors };
        return;
      }
      result = { hasError: false, fields };
    }
  );
  return result;
};

const getSchema = type => {
  const schemas = {
    signup: UserSchemas.getSignUpSchema(),
    signin: UserSchemas.getSignInSchema(),
    parcel: ParcelSchemas.getCreateParelSchema()
  };
  return schemas[type];
};

export default validator;
