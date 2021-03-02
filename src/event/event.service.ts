import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.model';
import { Repository } from 'typeorm';
import { EventInput } from './event.dto';
import { Event } from './event.model';
import { EventType } from '../eventtype/eventtype.model';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(EventType)
    private eventTypeRepository: Repository<EventType>,
  ) {}

  async create(eventDto: EventInput, user: User): Promise<Event> {
    let storedEventType;

    if (eventDto.eventType.name) {
      const findEventType = await this.eventTypeRepository.findOne({
        where: [{ name: eventDto.eventType.name }],
      });

      if (findEventType) {
        storedEventType = findEventType;
      } else {
        const newEventType = await this.eventTypeRepository.create({
          name: eventDto.eventType.name,
        });
        storedEventType = await this.eventTypeRepository.save(newEventType);
      }
    }
    const event: Event = await this.eventRepository.create({
      name: eventDto.name,
      user,
      eventType: storedEventType,
    });

    return await this.eventRepository.save(event);
  }

  findAll(): Promise<Event[]> {
    return this.eventRepository.find({ relations: ['user'] });
  }
}
