import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

/**
 * Authentication Guard to protect routes by verifying JWT tokens.
 * 
 * This guard ensures that only authenticated users with valid JWT tokens can access the protected routes.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Determines whether the current request is allowed to proceed.
   * 
   * @param context - The execution context for the request.
   * @returns A promise resolving to `true` if the request is authenticated, otherwise throws an `UnauthorizedException`.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract the incoming request from the context.
    const request = context.switchToHttp().getRequest();

    // Attempt to extract the JWT token from the Authorization header.
    const token = this.extractTokenFromHeader(request);

    // If no token is found, throw an unauthorized exception.
    if (!token) {
      throw new UnauthorizedException('No authentication token provided.');
    }

    try {
      // Verify the token and extract the payload.
      const payload = await this.jwtService.verifyAsync(token);

      // Attach the user payload to the request object for downstream access.
      request['user'] = payload;
    } catch {
      // If token verification fails, throw an unauthorized exception.
      throw new UnauthorizedException('Invalid or expired authentication token.');
    }

    // If all checks pass, allow the request to proceed.
    return true;
  }

  /**
   * Extracts the JWT token from the Authorization header.
   * 
   * @param request - The incoming HTTP request.
   * @returns The extracted token, or `undefined` if no valid token is found.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    // Split the Authorization header value into type and token.
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    // Return the token only if the type is "Bearer".
    return type === 'Bearer' ? token : undefined;
  }
}
