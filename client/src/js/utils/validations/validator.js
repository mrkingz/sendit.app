import Joi from "joi";
import UserSchemas from "./schemas/user";
import ParcelSchemas from "./schemas/parcel";

const validator = async (type, data) => {
  let result;
  Object.keys(data).forEach(item => {
    data[item] = data[item] ? data[item].toString().trim() : data[item];
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
    password: UserSchemas.getPasswordSchema(),
    parcel: ParcelSchemas.getCreateParelSchema(),
    status: ParcelSchemas.getDeliverytatusSchema(),
    location: ParcelSchemas.getLocationSchema(),
    details: ParcelSchemas.getParcelDetailsSchema(),
    destination: ParcelSchemas.getDestinationUpdateSchema(),
    pickup: ParcelSchemas.getPickUpUpdateSchema(),
    receiver: ParcelSchemas.getReceiverUpdateSchema()
  };
  return schemas[type];
};

export default validator;
