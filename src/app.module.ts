import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';

@Module({
  imports: [FilesModule, AwsS3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
