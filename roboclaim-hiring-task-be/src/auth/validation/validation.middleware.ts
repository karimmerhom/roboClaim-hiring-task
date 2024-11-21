import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { loginSchema } from '../../requests-validation-schemas/auth.schemas';

/**
 * Middleware for validating login requests.
 *
 * This middleware ensures that incoming requests to the login endpoint meet the required
 * validation rules defined in the `loginSchema`. If the request body is invalid, 
 * it throws a `BadRequestException` with the validation error messages.
 */
@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  /**
   * Method to validate the incoming request body for the login route.
   *
   * @param req - The Express `Request` object.
   * @param res - The Express `Response` object.
   * @param next - The `NextFunction` to pass control to the next middleware or controller.
   * @throws `BadRequestException` if the request body validation fails.
   */
  use(req: Request, res: Response, next: NextFunction) {
    // Validate the request body using the Joi schema.
    const { error } = loginSchema.validate(req.body);

    if (error) {
      // Throw a BadRequestException with concatenated error messages if validation fails.
      throw new BadRequestException(
        error.details.map((e) => e.message).join(', ')
      );
    }

    // Pass control to the next middleware or controller if validation succeeds.
    next();
  }
}
