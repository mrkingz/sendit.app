import Joi from "joi";
import UserSchemas from "./user";
import formatError from "../errorFormatter";

/**
 * Create parcel validation schema
 *
 * @static
 * @returns {object} the parcel validation schema
 * @method getParcelSchema
 * @memberof ParcelValidator
 */
const getCreateParelSchema = () => {
  return Joi.object()
    .keys(getParcelDetailsSchema())
    .keys(getPickupDetailsSchema())
    .keys(getDestinationDetailsSchema())
    .keys(getReceiverDetailsSchema());
};

/**
 *	Create parcel details validation schema keys
 *
 * @static
 * @returns {object} the parcel details validation schema keys
 * @method getParcelDetailsSchema
 */
const getParcelDetailsSchema = () => {
  return {
    weight: Joi.alternatives()
      .try([
        Joi.number()
          .integer()
          .greater(0)
          .positive(),
        Joi.number()
          .precision(2)
          .greater(0)
          .positive()
      ])
      .required(),
    description: Joi.string()
      .required()
      .max(255),
    deliveryMethod: Joi.string()
      .valid("Fast", "Normal")
      .required()
      .max(20)
      .label("Delivery method")
  };
};

/**
 *	Create parcel destination details validation schema keys
 *
 * @static
 * @returns {object} the parcel destination details validation schema keys
 * @method getPickupDetailsSchema
 */
const getPickupDetailsSchema = () => {
  return {
    pickUpAddress: Joi.string()
      .required()
      .max(150)
      .label("Pickup address"),
    pickUpLGAId: Joi.number()
      .integer()
      .required()
      .error(error =>
        formatError(error, null, "Please, select L.G. Area for pick up")
      ),
    pickUpStateId: Joi.number()
      .integer()
      .required()
      .error(error =>
        formatError(error, null, "Please, select state for pick up")
      )
  };
};

/**
 *	Create parcel destination details validation schema keys
 *
 * @static
 * @returns {object} the parcel destination details validation schema keys
 * @method getDestinationDetailsSchema
 */
const getDestinationDetailsSchema = () => {
  return {
    destinationAddress: Joi.string()
      .required()
      .max(150)
      .label("Destination address"),
    destinationLGAId: Joi.number()
      .integer()
      .required()
      .error(error =>
        formatError(
          error,
          null,
          "Please, select L.G. Area for parcel destination"
        )
      ),
    destinationStateId: Joi.number()
      .integer()
      .required()
      .error(error =>
        formatError(error, null, "Please, select state for parcel destination")
      )
  };
};

/**
 *	Create parcel receiver details validation schema keys
 *
 * @static
 * @returns {object} the parcel receiver details validation schema keys
 * @method getReceiverDetailsSchema
 */
const getReceiverDetailsSchema = () => {
  const phoneSchema = UserSchemas.getPhoneSchema({
    key: "receiverPhone",
    str: "Receiver",
    label: "phone number"
  });
  return {
    receiverName: Joi.string()
      .required()
      .max(200)
      .label("Receiver name"),
    receiverPhone: phoneSchema.receiverPhone,
    countryCode: phoneSchema.countryCode
  };
};

/**
 * Validate present location
 *
 * @static
 * @param {string}
 * @method getUpdateStatusSchema
 * @memberof ParcelValidator
 */
const getDeliverytatusSchema = () => {
  return Joi.object().keys({
    deliveryStatus: Joi.string()
      .insensitive()
      .required()
      .valid("Transiting", "Delivered")
      .max(100)
      .error(error => formatError(error, null, "Pleae, select delivery status"))
  });
};

const getLocationSchema = () => {
  return Joi.object().keys({
    locationStateId: Joi.number()
      .integer()
      .greater(0)
      .positive()
      .required()
      .error(error => formatError(error, null, "No state was selected")),
    locationLGAId: Joi.number()
      .integer()
      .greater(0)
      .positive()
      .required()
      .error(error => formatError(error, null, "No L.G. Area was selected"))
  });
};

const getDestinationUpdateSchema = () => {
  return Joi.object().keys(getDestinationDetailsSchema());
};

const getPickUpUpdateSchema = () => {
  return Joi.object().keys(getPickupDetailsSchema());
};

const getReceiverUpdateSchema = () => {
  return Joi.object().keys(getReceiverDetailsSchema());
};

export default {
  getCreateParelSchema,
  getDeliverytatusSchema,
  getLocationSchema,
  getParcelDetailsSchema,
  getDestinationUpdateSchema,
  getPickUpUpdateSchema,
  getReceiverUpdateSchema
};
