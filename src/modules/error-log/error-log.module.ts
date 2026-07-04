import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorLog, ErrorLogSchema } from './error-log.schema';
import { ErrorLogService } from './error-log.service';
import { ErrorLogController } from './error-log.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ErrorLog.name, schema: ErrorLogSchema }])
  ],
  controllers: [ErrorLogController],
  providers: [ErrorLogService],
  exports: [ErrorLogService],
})
export class ErrorLogModule {}
