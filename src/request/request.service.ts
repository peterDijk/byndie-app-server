import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.model';
import { Repository } from 'typeorm';
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
    const event = await this.eventRepository.findOne({ id: eventId });
    if (!event) {
      throw new HttpException('cant find event', HttpStatus.BAD_REQUEST);
    }

    const request = await this.requestRepository.create({
      user,
      event,
    });

    return await this.requestRepository.save(request);
  }

  async findAll(): Promise<Request[]> {
    return await this.requestRepository.find({
      relations: ['user', 'event', 'event.user'],
    });
  }
}
