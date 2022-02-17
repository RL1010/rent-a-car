import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/AuthCredentialsDto';
import { JwTPayload } from './JwtPayloadStrategy';
import { UserRepository } from '../Repositories/UserRepostiroy';

@Injectable()
export class AuthService {
constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
private jwtService: JwtService){}

signUp(authCredentialDto: AuthCredentialsDto): Promise<void>{
    return this.userRepository.signUp(authCredentialDto)
}

async signIn(authCredentialDto: AuthCredentialsDto): Promise<{accessToken: string}>{
    const username = await this.userRepository.validateUserPassword(authCredentialDto)
     if(!username){
         throw new UnauthorizedException('Invalid credentials')
     }

     const payload: JwTPayload = {username};
     const accessToken = await this.jwtService.sign(payload)

     return {accessToken}
    
}
}
