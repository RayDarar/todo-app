import joi from "@hapi/joi";

export enum ConfigsRaw {
  PORT = "PORT",
  MONGO_URI = "MONGO_URI",
  USERS_SECRET = "USERS_SECRET",
  USERS_TOKEN_SECRET = "USERS_TOKEN_SECRET",
  REDIS_PORT = "REDIS_PORT",
  REDIS_PASSWORD = "REDIS_PASSWORD",
}

export const configPattern = () => ({
  port: process.env[ConfigsRaw.PORT],
  db: {
    uri: process.env[ConfigsRaw.MONGO_URI],
  },
  secrets: {
    users: process.env[ConfigsRaw.USERS_SECRET],
    token: process.env[ConfigsRaw.USERS_TOKEN_SECRET],
  },
  redis: {
    port: process.env[ConfigsRaw.REDIS_PORT],
    password: process.env[ConfigsRaw.REDIS_PASSWORD],
  },
});

export const configValidation = joi.object({
  [ConfigsRaw.PORT]: joi.number().default(3000),
  [ConfigsRaw.MONGO_URI]: joi.string().required(),
  [ConfigsRaw.USERS_SECRET]: joi.string().required(),
  [ConfigsRaw.REDIS_PORT]: joi.number().default(6379),
  [ConfigsRaw.REDIS_PASSWORD]: joi.string().required(),
  [ConfigsRaw.USERS_TOKEN_SECRET]: joi.string().required(),
});
