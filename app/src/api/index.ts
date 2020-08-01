/* eslint-disable  @typescript-eslint/no-explicit-any */

import axios from "axios";

const api = axios.create({
  baseURL: "/api"
});

function Catch() {
  return function(
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;

    descriptor.value = async function() {
      try {
        return await method();
      } catch (error) {
        return error.response;
      }
    };

    return descriptor;
  };
}

export class AuthApi {
  @Catch()
  static async validateToken(token: string) {
    return api.post("/auth/validate", {
      accessToken: token
    });
  }
}
