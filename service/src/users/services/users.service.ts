import { Injectable, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import bcrypt from "bcrypt";

import { User } from "../schemas/users.schema";
import { UserCreateDto } from "../dto/user-create.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
  @InjectModel(User.name)
  private readonly UserModel: Model<User>;

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  public async getAllUsers(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  public async getIdByUsername(username: string): Promise<string> {
    const user = await this.UserModel.findOne({
      username,
    }).exec();
    return user._id;
  }

  public async getUserById(userId: string): Promise<User | null> {
    return this.UserModel.findOne({
      _id: userId,
    })
      .select({
        username: 1,
        _id: 1,
      })
      .populate("todos")
      .exec();
  }

  public async createUser({
    username,
    password,
  }: UserCreateDto): Promise<string | false> {
    const findUser = await this.UserModel.findOne({
      username,
    }).exec();
    if (findUser) return false;

    const user = await this.UserModel.create({
      username,
      password: await bcrypt.hash(
        password,
        (await bcrypt.genSalt()) + this.usersSecret,
      ),
      todos: [],
    });

    return user._id;
  }

  public async validateUser(
    userInfo: UserCreateDto,
  ): Promise<"ok" | "not-found" | "invalid"> {
    const user = await this.UserModel.findOne({
      username: userInfo.username,
    });

    if (!user) return "not-found";

    const result = await bcrypt.compare(userInfo.password, user.password);

    return result ? "ok" : "invalid";
  }

  get usersSecret(): string {
    return this.configService.get<string>("secrets.users");
  }
}
