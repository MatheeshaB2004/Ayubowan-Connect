import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('uploads')
export class FilesController {
  @Get('reviews/:filename')
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    // Construct the file path
    const filePath = join(process.cwd(), 'uploads', 'reviews', filename);

    // Check if file exists
    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    // Send the file
    res.sendFile(filePath);
  }
}
