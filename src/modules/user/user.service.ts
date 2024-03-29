import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'src/schemas/user.schema';
import { ICreateUser } from 'src/common/interfaces/create.user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createUser(params: ICreateUser): Promise<UserDocument> {
    const existUser = await this.findUser({ name: params.name });

    if (existUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user = new this.userModel({
      name: params.name,
      password: params.password,
    });

    await user.save();
    return user;
  }

  async findUser(filters: any): Promise<UserDocument> {
    return await this.userModel.findOne(filters);
  }
}
