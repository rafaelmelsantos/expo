import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Controller('auth')
export class AuthController {

    @Inject()
    private readonly authService: AuthService;

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() body: Prisma.UserCreateInput){
        return this.authService.signin(body);
    }
}
