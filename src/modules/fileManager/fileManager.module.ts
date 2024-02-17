import { Module } from '@nestjs/common';
import { FileManagerService } from './fileManager.service';
import { FileManagerController } from './fileManager.controller';

@Module({
  controllers: [FileManagerController],
  providers: [FileManagerService],
  exports: [FileManagerService],
})
export class FileManagerModule {}
