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

    descriptor.value = async function(...args: any[]) {
      try {
        return await method(...args);
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

  @Catch()
  static async authenticate(username: string, password: string) {
    return api.post("/auth/authenticate", {
      username,
      password
    });
  }
}

export class UsersApi {
  @Catch()
  static async createUser(username: string, password: string) {
    return api.post("/users/", {
      username,
      password
    });
  }

  @Catch()
  static async getUserById(userId: string) {
    return api.get(`/users/${userId}`);
  }
}
