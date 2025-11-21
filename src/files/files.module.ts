import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';

@Module({
  imports: [PrismaModule, AwsS3Module],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
