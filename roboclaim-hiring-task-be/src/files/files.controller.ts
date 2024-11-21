import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'; 
import { FilesService } from './files.service';  
import { AuthGuard } from '../auth/auth.guard';

/**
 * Controller for managing file operations such as uploading,
 * retrieving user files, and fetching files by ID.
 */
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  /**
   * Uploads a file, processes it, and stores its details in the database.
   * Guards the endpoint with authentication and ensures only one file is uploaded.
   *
   * @param req The incoming request, containing authenticated user details.
   * @param file The uploaded file, validated and processed by the service.
   * @returns A success message along with file processing details.
   * @throws BadRequestException if no file is uploaded or multiple files are provided.
   */
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file')) 
  async uploadFile(@Request() req, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    const result = await this.filesService.processFile(req.user.id, file);

    return {
      message: 'File processed successfully.',
      data: result,
    };
  }

  /**
   * Retrieves all files uploaded by the authenticated user.
   *
   * @param req The incoming request, containing authenticated user details.
   * @returns A list of files uploaded by the user.
   */
  @UseGuards(AuthGuard) 
  @Get()
  async getUserFiles(@Request() req) {
    return this.filesService.getUserFiles(req.user.id);
  }

  /**
   * Fetches details of a specific file by its ID.
   *
   * @param id The ID of the file to retrieve.
   * @returns Details of the requested file.
   * @throws NotFoundException if the file is not found.
   */
  @UseGuards(AuthGuard)
  @Get(':id')
  async getFileById(@Param('id') id: number) {
    return this.filesService.getFileById(id);
  }
}
