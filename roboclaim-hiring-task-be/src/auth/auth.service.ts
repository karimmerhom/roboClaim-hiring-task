import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USERS } from 'src/constants/users';

/**
 * AuthService handles authentication logic, including user sign-in and generating JWT tokens.
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,  // Injecting JwtService to handle JWT generation
  ) {}

  /**
   * Signs in a user by validating the provided email and password.
   * 
   * This method searches for the user in the local `USERS` constant. If the user is found
   * and the password matches, it generates an access token (JWT) for the user.
   * 
   * @param email - The email address of the user trying to sign in.
   * @param password - The password of the user trying to sign in.
   * @returns An object containing the JWT `access_token` if authentication is successful.
   * @throws UnauthorizedException - If the email or password is incorrect.
   * 
   * Example usage:
   * ```typescript
   * const result = await authService.signIn('user@example.com', 'password123');
   * console.log(result.access_token);  // Use the token to authenticate API requests
   * ```
   */
  async signIn(
    email: string,  // The email provided by the user attempting to log in
    password: string,  // The password provided by the user attempting to log in
  ): Promise<{ access_token: string, user:{id:number, email:string} }> {
    // Search for the user in the USERS constant
    const user = USERS.find((u) => u.email === email && u.password === password);

    // If no user is found or the password doesn't match, throw an UnauthorizedException
    if (user?.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Payload to be embedded in the JWT (user's ID and email)
    const payload = { id: user.id, email: user.email };

    // Generate and return the JWT access token and user
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: payload
    };
  }
}
