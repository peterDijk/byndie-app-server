import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventType } from '../eventtype/eventtype.model';
import { EventtypeModule } from '../eventtype/eventtype.module';
import { User } from '../users/user.model';
import { UsersModule } from '../users/users.module';
import { Event } from './event.model';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => EventtypeModule),
    TypeOrmModule.forFeature([Event, User, EventType]),
  ],
  providers: [EventResolver, EventService],
})
export class EventModule {}
