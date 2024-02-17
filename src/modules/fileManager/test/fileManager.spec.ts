import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { Readable } from 'node:stream';
import { resolve } from 'node:path';

import { FileManagerService } from '../fileManager.service';

describe('FileManagerService', () => {
  let fileManagerService: FileManagerService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [FileManagerService],
    }).compile();

    fileManagerService = moduleRef.get<FileManagerService>(FileManagerService);
  });

  describe('FileManagerService', () => {
    it('should parse CSV and return JSON', async () => {
      const amenitiesCsv = readFileSync(
        resolve(__dirname, './__mock__/amenities.csv'),
        'utf8',
      );

      const amenitiesJSON = readFileSync(
        resolve(__dirname, './__mock__/amenities.json'),
        'utf8',
      );

      // Mock file object
      const file: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'amenities.csv',
        encoding: '7bit',
        mimetype: 'amenities/csv',
        destination: './',
        filename: 'amenities.csv',
        path: resolve(__dirname, './__mock__/amenities.csv'),
        size: Buffer.byteLength(amenitiesCsv),
        buffer: Buffer.from(amenitiesCsv),
        stream: new Readable(),
      };

      // Call the service method
      const result = await fileManagerService.parseFile(file, false);

      // Assert the result
      expect(result).toEqual(JSON.parse(amenitiesJSON));
    });

    it('should throw an exception if no file is provided', async () => {
      let error: any;
      try {
        await fileManagerService.parseFile(undefined);
      } catch (e) {
        error = e;
      }

      // Assert the error
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe('No file uploaded');
    });
  });
});
