import joi from "@hapi/joi";

export const userCreateValidator = joi.object({
  username: joi
    .string()
    .min(2)
    .required(),
  password: joi
    .string()
    .min(8)
    .required(),
});
