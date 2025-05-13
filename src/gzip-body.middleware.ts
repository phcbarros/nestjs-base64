import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as zlib from 'zlib';

@Injectable()
export class GzipBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const contentEncoding = req.headers['content-encoding'];

    if (contentEncoding === 'gzip') {
      const chunks: Buffer[] = [];

      req.on('data', (chunk) => {
        chunks.push(chunk);
      });

      req.on('end', () => {
        const buffer = Buffer.concat(chunks);
        zlib.gunzip(buffer, (err, decoded) => {
          if (err) {
            return res.status(400).send('Invalid gzip body');
          }

          try {
            req.body = JSON.parse(decoded.toString());
            next();
          } catch (e) {
            res.status(400).send('Invalid JSON');
          }
        });
      });
    } else {
      // Se não for gzip, ignora
      next();
    }
  }
}
