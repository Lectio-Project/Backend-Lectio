import { Module } from '@nestjs/common';
import { ThoughtService } from './thought.service';
import { ThoughtController } from './thought.controller';

@Module({
  controllers: [ThoughtController],
  providers: [ThoughtService],
})
export class ThoughtModule {}
