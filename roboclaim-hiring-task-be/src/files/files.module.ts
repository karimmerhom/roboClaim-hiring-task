import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '../entities/file.entity';
import { AuthGuard } from 'src/auth/auth.guard';

/**
 * The FilesModule is responsible for handling the file-related functionality in the application.
 * It manages file-related routes, services, and integrates with the authentication system.
 */
@Module({
  imports: [
    /**
     * The AuthModule is imported to handle authentication, ensuring that file operations
     * are secured by authentication mechanisms such as JWT.
     */
    AuthModule,

    /**
     * The TypeOrmModule is used to interact with the database.
     * The `forFeature` method is used to register the `File` entity, allowing access to the `File` table
     * through TypeORM repository and ORM operations.
     */
    TypeOrmModule.forFeature([File]),
  ],
  controllers: [
    /**
     * The FilesController handles the HTTP requests related to file operations such as file upload, download, etc.
     */
    FilesController,
  ],
  providers: [
    /**
     * The FilesService contains the business logic for file handling. It communicates with the database
     * and provides the functionality for the controllers.
     */
    FilesService,

    /**
     * The AuthGuard is provided to protect routes in the module that require authentication.
     * It will ensure that only authenticated users can access certain endpoints.
     */
    AuthGuard,
  ],
})
export class FilesModule {}
