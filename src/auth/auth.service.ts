import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtservice: JwtService
    ) { }
    async cekUser(dto: AuthDto) {
        const login  = await this.userService.login(dto);
        console.log(login);
        return login;
    }
    generateToken(no: any) {
        let dataToken = { id: no.id }
        let token = this.jwtservice.sign(dataToken)
        return { token: token }
    }
}
