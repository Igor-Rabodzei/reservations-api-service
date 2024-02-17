import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createReadStream, unlinkSync } from 'node:fs';
import { parse, Row } from '@fast-csv/parse';

@Injectable()
export class FileManagerService {
  async deleteTmpFile(filePath): Promise<void> {
    try {
      unlinkSync(filePath);
    } catch (err) {
      throw new HttpException('Upload file error', HttpStatus.BAD_REQUEST);
    }
  }

  async parseFile(
    file: Express.Multer.File,
    deleteTmpFile = true,
  ): Promise<JSON> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    try {
      const csvRows: Row[] = [];

      const csvStream = parse({ headers: true });

      createReadStream(file.path)
        .pipe(csvStream)
        .on('data', (data) => csvRows.push(data));

      await new Promise((resolve, reject) => {
        csvStream.on('end', () => resolve(1));
        csvStream.on('error', (err) => reject(err));
      });

      if (deleteTmpFile) await this.deleteTmpFile(file.path);

      return JSON.parse(JSON.stringify(csvRows));
    } catch (err) {
      throw new HttpException('Upload file error', HttpStatus.BAD_REQUEST);
    }
  }
}
