import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as bcrypt from 'bcrypt';
import { convertToEn } from 'src/common/helper/convert-fr-number-en';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { mongoIdParams } from 'src/common/class/mongo-id-params';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture',{
    storage: diskStorage({
      destination: './upload',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async create(
    @Body() createUserDto: CreateUserDto,  
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    ) profilePicture: Express.Multer.File
  ) {
    const salt = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.profilePicture = profilePicture.path;
    createUserDto.credit = convertToEn(createUserDto.credit);
    const newUser = (await this.usersService.create(createUserDto)).toObject();
    delete newUser.password;
    return newUser;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneByID(id);
  }

  @Patch(':_id')
  async update(@Param() params: mongoIdParams, @Body() updateUserDto: UpdateUserDto) {
    const { credit } = updateUserDto;
    const { _id } = params;
    const user = await this.usersService.findOneByID(_id);
    if ( credit ) {
      const totalCredit: number = parseInt(convertToEn(""+credit)) + (user.credit);
      updateUserDto.credit = ""+totalCredit; 
    }
    return this.usersService.update(params._id, updateUserDto);
  }
}
