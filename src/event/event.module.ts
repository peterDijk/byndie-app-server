import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.model';
import { UsersModule } from '../users/users.module';
import { Event } from './event.model';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Event, User]),
  ],
  providers: [EventResolver, EventService],
})
export class EventModule {}
