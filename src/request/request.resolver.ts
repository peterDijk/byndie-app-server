import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Event } from '../event/event.model';
import { EventInput } from '../event/event.dto';
import { UsersService } from '../users/users.service';
import { EventService } from '../event//event.service';
import { CurrentUser, GqlAuthGuard } from '../auth/graphql.guard';
import { User } from '../users/user.model';
import { Request } from '../request/request.model';
import { RequestInput } from '../request/request.dto';
import { RequestService } from '../request/request.service';

@Resolver((of) => Request)
export class RequestResolver {
  constructor(@Inject(RequestService) private requestService: RequestService) {}

  private readonly logger = new Logger(RequestResolver.name);

  @Mutation((returns) => Request)
  @UseGuards(GqlAuthGuard)
  async createRequestForEvent(
    @Args('input') input: RequestInput,
    @CurrentUser() user: User,
  ): Promise<Request> {
    return await this.requestService.create(input.eventId, user);
  }

  @Mutation((returns) => Request)
  @UseGuards(GqlAuthGuard)
  async acceptRequest(
    @Args('requestId') requestId: string,
    @CurrentUser() user: User,
  ): Promise<Request> {
    return await this.requestService.accept(requestId, user);
  }

  @Mutation((returns) => Request)
  @UseGuards(GqlAuthGuard)
  async declineRequest(
    @Args('requestId') requestId: string,
    @CurrentUser() user: User,
  ): Promise<Request> {
    return await this.requestService.decline(requestId, user);
  }

  @Query((returns) => [Request])
  @UseGuards(GqlAuthGuard)
  async allRequests(): Promise<Request[]> {
    return await this.requestService.findAll();
  }

  @Query((returns) => [Request])
  @UseGuards(GqlAuthGuard)
  async requestsForMyEvents(@CurrentUser() user: User): Promise<Request[]> {
    return await this.requestService.findUserEventsRequests(user);
  }
}
