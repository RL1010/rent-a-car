import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './JwtStrategy';
import { User } from '../Entities/UserEntity';
import { UserRepository } from '../Repositories/UserRepostiroy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
    secret: 'super-secret',
    signOptions:{
      expiresIn: 360000000,
    }
  }),
    TypeOrmModule.forFeature([User, UserRepository])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}
