import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../event/event.model';
import { EventModule } from '../event/event.module';
import { Request } from './request.model';
import { RequestResolver } from './request.resolver';
import { RequestService } from './request.service';

@Module({
  imports: [
    forwardRef(() => EventModule),
    TypeOrmModule.forFeature([Request, Event]),
  ],
  providers: [RequestService, RequestResolver],
})
export class RequestModule {}
