import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwTPayload } from "./JwtPayloadStrategy";
import { User } from "../Entities/UserEntity";
import { UserRepository } from "../Repositories/UserRepostiroy";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
constructor(@InjectRepository(UserRepository) private userRepository: UserRepository){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'super-secret',
    })
}

async validate(payload: JwTPayload): Promise<User>{
    const {username} = payload
    const user = await this.userRepository.findOne({username})

    if(!user){
       throw new UnauthorizedException(); 
    }
    return user;
}
}