import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument> 
  ){}
  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find().exec();
  }
  
  async findOneByEmail(email: string) {
    return await this.userModel.findOne({email}).select('+password').exec();
  }

  async findOneByID(_id: string) {
    return await this.userModel.findOne({_id}).select('+password').exec();;
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findOneAndUpdate({_id}, updateUserDto, {new: true});;
  }
}
