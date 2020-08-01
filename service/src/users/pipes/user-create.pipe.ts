import { PipeTransform, BadRequestException } from "@nestjs/common";
import { UserCreateDto } from "../dto/user-create.dto";
import { userCreateValidator } from "../validators/user-create.validator";

export class UserCreatePipe implements PipeTransform {
  transform(userInfo: UserCreateDto) {
    const { error } = userCreateValidator.validate(userInfo);
    if (error) {
      throw new BadRequestException(error);
    }

    return userInfo;
  }
}
