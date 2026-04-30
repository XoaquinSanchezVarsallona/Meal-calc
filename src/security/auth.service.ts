import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface TokenPayload {
  sub: string;
  email: string;
  creationTime?: number;
  expiringTime?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(userId: string, email: string): Promise<AuthTokens> {
    const jwtExpiration = this.configService.get<number>('JWT_EXPIRATION') || 3600;
    const refreshExpiration = this.configService.get<number>('REFRESH_TOKEN_EXPIRATION') || 604800;

    const payload: TokenPayload = {
      sub: userId,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: jwtExpiration,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: refreshExpiration,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
      expiresIn: jwtExpiration,
    };
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync<TokenPayload>(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  async generateAccessToken(userId: string, email: string): Promise<string> {
    const jwtExpiration = this.configService.get<number>('JWT_EXPIRATION') || 3600;

    const payload: TokenPayload = {
      sub: userId,
      email,
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: jwtExpiration,
    });
  }

  decodeToken(token: string): TokenPayload | null {
    return this.jwtService.decode(token);
  }
}
