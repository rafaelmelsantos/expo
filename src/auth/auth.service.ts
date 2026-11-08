import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma} from '../generated/prisma/browser.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class AuthService {
    @Inject()
    private readonly jwtService: JwtService;

    @Inject()
    private readonly prisma: PrismaService;

    // Signin metodo restornando o token JWT senha == varios numeros / varios numeros == senha criptografada no banco de dados
    async signin(
        params: Prisma.UserCreateInput
    ): Promise<{access_token:String}> {
       const user = await this.prisma.user.findUnique({
         where: { email: params.email }
       });
       if(!user) throw new NotFoundException('User not found');
       const passwordMatch = await bcrypt.compare(params.password, user.password);
        if(!passwordMatch) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id};

        
        return {access_token: await this.jwtService.signAsync(payload)};
    }
}
