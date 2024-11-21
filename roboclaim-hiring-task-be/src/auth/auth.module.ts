import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LoginValidationMiddleware } from './validation/validation.middleware';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * The AuthModule is responsible for handling authentication-related features in the application.
 * It includes JWT authentication configuration, authentication routes, and guards.
 */
@Module({
  imports: [
    /**
     * The JwtModule is configured asynchronously using values from the ConfigModule.
     * It sets up JWT with the secret and timeout based on the environment variables.
     */
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard, JwtModule],
})
export class AuthModule implements NestModule {
  /**
   * Configures the middleware for the AuthModule.
   * Applies the LoginValidationMiddleware to the `/auth/login` route.
   * 
   * @param consumer The middleware consumer used to apply middlewares to routes.
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('auth/login');
  }
}
