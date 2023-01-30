import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/task'), 
    ConfigModule.forRoot({
      isGlobal: true,
      load: []
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
