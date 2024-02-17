import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileManagerService } from './fileManager.service';

@Controller('/api/v1/file-manager')
export class FileManagerController {
  constructor(private readonly fileManagerService: FileManagerService) {}

  @Post('parse')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', { dest: '/usr/src/reservations-app/tmp' }),
  )
  async parseFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return await this.fileManagerService.parseFile(file);
  }
}
