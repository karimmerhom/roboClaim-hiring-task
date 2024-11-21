import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entity representing a File record in the database.
 * 
 * This entity maps the `File` table in the database and contains fields for file attributes
 * such as name, type, size, content, metadata, and user association.
 */
@Entity()
export class File {
  /**
   * Unique identifier for each file.
   * This field is auto-generated.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Name of the uploaded file.
   */
  @Column()
  fileName: string;

  /**
   * MIME type of the uploaded file (e.g., `image/png`, `application/pdf`).
   */
  @Column()
  fileType: string;

  /**
   * Size of the uploaded file in bytes.
   */
  @Column()
  fileSize: number;

  /**
   * Extracted text content from the file (if applicable).
   */
  @Column()
  text: string;

  /**
   * Metadata associated with the file.
   * 
   * This field stores JSON data, such as image dimensions, creation date, or PDF info.
   * It's nullable to accommodate files without metadata.
   */
  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;

  /**
   * ID of the user who uploaded the file.
   * This establishes a relationship between the file and the user.
   */
  @Column()
  userId: number;
}
