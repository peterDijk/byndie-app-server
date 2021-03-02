import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Event } from './event.model';
import { EventInput } from './event.dto';
import { UsersService } from '../users/users.service';
import { EventService } from './event.service';
import { CurrentUser, GqlAuthGuard } from '../auth/graphql.guard';
import { User } from '../users/user.model';

@Resolver((of) => Event)
export class EventResolver {
  constructor(
    @Inject(EventService) private eventService: EventService,
    @Inject(UsersService) private usersService: UsersService,
  ) {}

  private readonly logger = new Logger(EventResolver.name);

  @Mutation((returns) => Event)
  @UseGuards(GqlAuthGuard)
  async addEvent(
    @Args('input') eventDto: EventInput,
    @CurrentUser() user: User,
  ): Promise<Event> {
    return await this.eventService.create(eventDto, user);
  }

  @Query((returns) => [Event], {
    description: 'Authorized - list all stored events',
  })
  @UseGuards(GqlAuthGuard)
  async allEvents(): Promise<Event[]> {
    return await this.eventService.findAll();
  }

  @Query((returns) => Event, { description: 'Authorized - find 1 event' })
  @UseGuards(GqlAuthGuard)
  async oneEvent(@Args('id') id: string) {
    return await this.eventService.findOne(id);
  }
}
