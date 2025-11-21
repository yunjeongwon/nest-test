import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: AwsS3Service,
  ) {}

  async uploads(files: Express.Multer.File[]) {
    return await files.map((file) => this.upload(file));
  }

  async upload(file: Express.Multer.File) {
    const result = await this.s3.uploadFile(file);

    const saved = await this.prisma.file.create({
      data: {
        name: file.originalname,
        key: result.key,
        url: result.url,
      },
    });

    return saved;
  }

  findAll() {
    return this.prisma.file.findMany();
  }

  findOne(id: string) {
    return this.prisma.file.findUnique({ where: { id } });
  }
}