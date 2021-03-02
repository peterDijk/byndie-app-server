import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.model';
import { In, Repository } from 'typeorm';
import { EventType } from '../eventtype/eventtype.model';
import { Location } from '../location/location.model';
import { Event } from '../event/event.model';
import { Request } from './request.model';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
  ) {}

  async create(eventId: string, user: User): Promise<Request> {
    /*


    */
    const event = await this.eventRepository.findOne(
      { id: eventId },
      { relations: ['user'] },
    );
    if (!event) {
      throw new HttpException('cant find event', HttpStatus.BAD_REQUEST);
    }

    if (event.user.id === user.id) {
      throw new HttpException(
        'cant make request for your own event',
        HttpStatus.BAD_REQUEST,
      );
    }

    const request = await this.requestRepository.create({
      user,
      event,
    });

    return await this.requestRepository.save(request);
  }

  async accept(requestId: string, currentUser: User): Promise<Request> {
    const request = await this.requestRepository.findOne(requestId, {
      relations: ['event', 'event.user'],
    });

    if (request.event.user.id !== currentUser.id) {
      throw new HttpException(
        'cant accept a request thats not for your own event',
        HttpStatus.FORBIDDEN,
      );
    }

    request.accepted = true;
    request.declined = false;

    return await this.requestRepository.save(request);
  }

  async decline(requestId: string, currentUser: User): Promise<Request> {
    const request = await this.requestRepository.findOne(requestId, {
      relations: ['event', 'event.user'],
    });

    if (request.event.user.id !== currentUser.id) {
      throw new HttpException(
        'cant decline a request thats not for your own event',
        HttpStatus.FORBIDDEN,
      );
    }

    request.accepted = false;
    request.declined = true;

    return await this.requestRepository.save(request);
  }

  async findAll(): Promise<Request[]> {
    return await this.requestRepository.find({
      relations: ['user', 'event', 'event.user'],
    });
  }

  async findUserEventsRequests(user: User): Promise<Request[]> {
    const userEvents = await this.eventRepository.find({ where: { user } });
    if (!userEvents) {
      throw new HttpException('user has no events', HttpStatus.NOT_FOUND);
    }
    const userRequests = await this.requestRepository.find({
      where: { event: In(userEvents.map((event) => event.id)) },
      relations: ['event', 'user'],
    });

    return userRequests;
  }
}
