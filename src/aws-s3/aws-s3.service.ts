import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AwsS3Service {
    private readonly s3: S3Client;
    private readonly bucket = process.env.S3_BUCKET_NAME;
    private readonly region = process.env.AWS_REGION;

    constructor() {
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY ?? '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
            }
        });
    }

    async uploadFile(file: Express.Multer.File) {
        const key = file.originalname;

        await this.s3.send(
            new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file.buffer,
            })
        );

        const url = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;

        return {
            name: key,
            url,
            key,
        };
    }
    
    async uploadFiles(files: Express.Multer.File[]) {
        return await Promise.all(files.map((file) => this.uploadFile(file)));
    }
}
