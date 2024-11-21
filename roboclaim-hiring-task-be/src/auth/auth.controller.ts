import { Controller, Post, Body, UnauthorizedException, HttpStatus, HttpCode } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USERS } from '../constants/users';
import { AuthService } from './auth.service';

/**
 * AuthController handles authentication-related routes in the application.
 * It contains the `login` route to authenticate users.
 */
@Controller('auth')
export class AuthController {
  /**
   * Creates an instance of AuthController.
   * @param authService The AuthService instance used for user authentication.
   */
  constructor(private authService: AuthService) {}

  /**
   * Endpoint to authenticate a user by email and password.
   * The `signIn` method of the AuthService is called to generate a JWT token if the credentials are valid.
   * 
   * @param body The request body containing the `email` and `password` of the user.
   * @returns A response containing the `access_token` if authentication is successful.
   * @throws UnauthorizedException If the credentials are invalid.
   * 
   * @example
   * POST /auth/login
   * Body: {
   *   "email": "user@example.com",
   *   "password": "userPassword123"
   * }
   * 
   * @see AuthService#signIn
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: Record<string, any>) {
    return this.authService.signIn(body.email, body.password);
  }
}
