import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../location/location.model';
import { LocationModule } from '../location/location.module';
import { EventType } from '../eventtype/eventtype.model';
import { EventTypeModule } from '../eventtype/eventtype.module';
import { User } from '../users/user.model';
import { UsersModule } from '../users/users.module';
import { Event } from './event.model';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => EventTypeModule),
    forwardRef(() => LocationModule),
    TypeOrmModule.forFeature([Event, User, EventType, Location]),
  ],
  providers: [EventResolver, EventService],
})
export class EventModule {}
