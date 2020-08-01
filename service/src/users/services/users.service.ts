import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User } from "../schemas/users.schema";

@Injectable()
export class UsersService {
  @InjectModel(User.name)
  private readonly UserModel: Model<User>;

  public async getAllUsers(): Promise<User[]> {
    return this.UserModel.find().exec();
  }
}
