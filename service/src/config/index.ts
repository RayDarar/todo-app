import joi from "@hapi/joi";

export enum ConfigsRaw {
  PORT = "PORT",
  MONGO_URI = "MONGO_URI",
}

export const configPattern = () => ({
  port: process.env[ConfigsRaw.PORT],
  db: {
    uri: process.env[ConfigsRaw.MONGO_URI],
  },
});

export const configValidation = joi.object({
  [ConfigsRaw.PORT]: joi.number().default(3000),
  [ConfigsRaw.MONGO_URI]: joi.string().required(),
});
