import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../event/event.model';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
})
export class EventtypeModule {}
