import joi from "@hapi/joi";

export enum ConfigsRaw {
  PORT = "PORT",
  MONGO_URI = "MONGO_URI",
  USERS_SECRET = "USERS_SECRET",
}

export const configPattern = () => ({
  port: process.env[ConfigsRaw.PORT],
  db: {
    uri: process.env[ConfigsRaw.MONGO_URI],
  },
  secrets: {
    users: process.env[ConfigsRaw.USERS_SECRET],
  },
});

export const configValidation = joi.object({
  [ConfigsRaw.PORT]: joi.number().default(3000),
  [ConfigsRaw.MONGO_URI]: joi.string().required(),
  [ConfigsRaw.USERS_SECRET]: joi.string().required(),
});
