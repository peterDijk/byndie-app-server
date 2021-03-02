import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Event } from './event.model';
import { EventInput, FilterInput } from './event.dto';
import { EventService } from './event.service';
import { CurrentUser, GqlAuthGuard } from '../auth/graphql.guard';
import { User } from '../users/user.model';
import { RequestService } from '../request/request.service';
import { EventType } from '../eventtype/eventtype.model';

@Resolver((of) => Event)
export class EventResolver {
  constructor(
    @Inject(EventService) private eventService: EventService,
    @Inject(RequestService) private requestService: RequestService,
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
    description: 'Authorized - list events owned by logged in user',
  })
  @UseGuards(GqlAuthGuard)
  async myEvents(
    @CurrentUser() user: User,
    @Args({ name: 'filter', nullable: true }) filter?: FilterInput,
  ): Promise<Event[]> {
    return await this.eventService.findMyEvents(user, filter);
  }

  @Query((returns) => [Event], {
    description: 'Authorized - list all stored events',
  })
  @UseGuards(GqlAuthGuard)
  async allEvents(
    @Args({ name: 'filter', nullable: true }) filter?: FilterInput,
  ): Promise<Event[]> {
    return await this.eventService.findAll(filter);
  }

  @Query((returns) => [EventType], {
    description: 'Authorized - list all event types',
  })
  @UseGuards(GqlAuthGuard)
  async allEventTypes(): Promise<EventType[]> {
    return await this.eventService.findAllEventTypes();
  }

  @Query((returns) => Event, { description: 'Authorized - find 1 event' })
  @UseGuards(GqlAuthGuard)
  async oneEvent(@Args('id') id: string) {
    return await this.eventService.findOne(id);
  }
}
