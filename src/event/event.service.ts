import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.model';
import { Repository } from 'typeorm';
import { EventInput } from './event.dto';
import { Event } from './event.model';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
  ) {}

  async create(eventDto: EventInput, user: User): Promise<Event> {
    const event: Event = await this.eventRepo.create({
      name: eventDto.name,
      user,
    });

    return await this.eventRepo.save(event);
  }
}
