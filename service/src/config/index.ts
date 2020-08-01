import joi from "@hapi/joi";

export enum ConfigsRaw {
  PORT = "PORT",
}

export const configPattern = () => ({
  port: process.env[ConfigsRaw.PORT],
});

export const configValidation = joi.object({
  [ConfigsRaw.PORT]: joi.number().default(3000),
});
