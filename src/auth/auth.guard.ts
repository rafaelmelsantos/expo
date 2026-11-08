import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service.js';

@Injectable()
export class AuthGuard implements CanActivate {


  @Inject()
  private readonly userService: UserService;

  //guard para verificar se o usuário está autenticado antes de acessar as rotas protegidas
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = this.extractTokenFromHeader(request);
    if (!authorizationHeader)
      throw new UnauthorizedException('token is required');

    try {
      const payload = this.userService.verify(authorizationHeader, {
        secret: process.env.SECRET_KEY,
      });
      request['sub'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  //extrair o token do header da requisição
  private extractTokenFromHeader(request: {
    headers: { authorization?: string };
  }): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
