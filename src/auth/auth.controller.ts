import { Controller, Post, Body, UnauthorizedException, UseGuards, Get, Request, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../users/dto/register.dto';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      this.logger.debug(`Tentative d'inscription pour l'email: ${registerDto.email}`);
      const { user, isArtisan } = await this.authService.register(registerDto);
      this.logger.debug(`Inscription réussie pour l'email: ${registerDto.email}`);
      return { isArtisan };
    } catch (error) {
      this.logger.error(`Erreur lors de l'inscription: ${error.message}`, error.stack);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Une erreur est survenue lors de l\'inscription',
          details: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      this.logger.debug(`Tentative de connexion pour l'email: ${loginDto.email}`);
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        throw new UnauthorizedException('Email ou mot de passe incorrect');
      }
      this.logger.debug(`Connexion réussie pour l'email: ${loginDto.email}`);
      return this.authService.login(user);
    } catch (error) {
      this.logger.error(`Erreur lors de la connexion: ${error.message}`, error.stack);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Une erreur est survenue lors de la connexion',
          details: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
} 