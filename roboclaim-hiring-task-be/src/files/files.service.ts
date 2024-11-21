  import {
    Injectable,
    BadRequestException,
    NotFoundException,
  } from '@nestjs/common';
  import * as path from 'path';
  import * as pdfParse from 'pdf-parse';
  import * as Tesseract from 'tesseract.js';
  import * as sharp from 'sharp';
  import { File } from '../entities/file.entity';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';

  /**
   * Service to handle file operations such as processing, storing, and retrieving files.
   */
  @Injectable()
  export class FilesService {
    constructor(
      @InjectRepository(File)
      private fileRepository: Repository<File>,
    ) {}

    /**
     * Processes an uploaded file based on its type (PDF or image), extracts text and metadata, and saves it to the database.
     *
     * @param userId The ID of the user uploading the file.
     * @param file The uploaded file.
     * @returns Details of the processed file including extracted text and metadata.
     * @throws BadRequestException if the file type is unsupported or processing fails.
     */
    async processFile(userId: number, file: Express.Multer.File) {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      let result = {
        extractedData: null,
        metadata: null,
      };

      if (fileExtension === '.pdf') {
        result = await this.extractTextAndMetadataFromPdf(file);
      } else if (['.png', '.jpg', '.jpeg'].includes(fileExtension)) {
        result.extractedData = await this.extractTextFromImage(file);
        result.metadata = await this.extractImageMetadata(file);
      } else {
        throw new BadRequestException('Unsupported file type.');
      }

      const newFile = this.fileRepository.create({
        fileName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
        text: result.extractedData,
        metadata: result.metadata,
        userId,
      });

      await this.fileRepository.save(newFile);

      return {
        fileName: file.originalname,
        fileSize: file.size,
        extractedData: result.extractedData,
        metadata: result.metadata,
      };
    }

    /**
     * Extracts text and metadata from a PDF file.
     *
     * @param file The uploaded PDF file.
     * @returns An object containing extracted text and metadata.
     * @throws BadRequestException if PDF processing fails.
     */
    private async extractTextAndMetadataFromPdf(
      file: Express.Multer.File,
    ): Promise<{ extractedData: string; metadata: any }> {
      const buffer = file.buffer;
      try {
        const data = await pdfParse(buffer);
        return {
          extractedData: data.text,
          metadata: data.info || null,
        };
      } catch (error) {
        console.log(error)
        throw new BadRequestException('Error extracting text and metadata from PDF.');
      }
    }

    /**
     * Extracts text from an image file using OCR.
     *
     * @param file The uploaded image file.
     * @returns The extracted text from the image.
     * @throws BadRequestException if OCR processing fails.
     */
    private async extractTextFromImage(file: Express.Multer.File): Promise<string> {
      return new Promise((resolve, reject) => {
        const buffer = file.buffer;
        Tesseract.recognize(buffer, 'eng', { logger: (m) => console.log(m) })
          .then(({ data: { text } }) => resolve(text))
          .catch(() => reject(new BadRequestException('Error processing image OCR.')));
      });
    }

    /**
     * Extracts metadata from an image file.
     *
     * @param file The uploaded image file.
     * @returns The metadata extracted from the image.
     * @throws BadRequestException if metadata extraction fails.
     */
    private async extractImageMetadata(file: Express.Multer.File): Promise<any> {
      const buffer = file.buffer;
      try {
        const metadata = await sharp(buffer).metadata();
        return metadata;
      } catch (error) {
        throw new BadRequestException('Error extracting image metadata.');
      }
    }

    /**
     * Retrieves all files uploaded by a specific user.
     *
     * @param userId The ID of the user.
     * @returns A list of files belonging to the user with selected details (ID, name, type, and size).
     * @throws BadRequestException if retrieval fails.
     */
    async getUserFiles(userId: number): Promise<any[]> {
      try {
        return await this.fileRepository.find({
          where: { userId },
          select: ['id', 'fileName', 'fileType', 'fileSize'],
        });
      } catch (error) {
        throw new BadRequestException('Error retrieving user files.');
      }
    }

    /**
     * Retrieves a file by its ID.
     *
     * @param fileId The ID of the file to retrieve.
     * @returns The file details.
     * @throws NotFoundException if the file is not found.
     */
    async getFileById(fileId: number): Promise<File> {
      const file = await this.fileRepository.findOne({ where: { id: fileId } });

      if (!file) {
        throw new NotFoundException(`File with ID ${fileId} not found.`);
      }

      return file;
    }
  }
