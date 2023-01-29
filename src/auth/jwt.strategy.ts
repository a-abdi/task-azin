import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const _id: string = payload.sub;
    const user = (await this.usersService.findOneByID(_id))?.toObject();

    if (!user) {
      throw new UnauthorizedException();
    }

    if (payload?.email !== user.email) {
      throw new UnauthorizedException();
    }

    return { 
      userId: _id, 
      email: payload.email,
   };
  }
}