import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

export class IsValidImageFile extends FileValidator {
  isValid(file: IFile): boolean | Promise<boolean> {
    return this.validationOptions.mimetypes.includes(file.mimetype);
  }

  buildErrorMessage(file: any): string {
    if (file.mimetype) {
      return `Invalid file type. Only ${this.validationOptions.mimetypes} are allowed.`;
    }
  }
}
