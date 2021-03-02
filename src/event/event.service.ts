import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.model';
import { Repository } from 'typeorm';
import { EventInput } from './event.dto';
import { Event } from './event.model';
import { EventType } from '../eventtype/eventtype.model';
import { Location } from '../location/location.model';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(EventType)
    private eventTypeRepository: Repository<EventType>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  private readonly logger = new Logger(EventService.name);

  async create(eventDto: EventInput, user: User): Promise<Event> {
    const {
      name,
      eventType,
      location,
      maxPeople,
      dateFrom,
      dateTo,
      description,
      details,
    } = eventDto;
    let storedEventType;

    if (eventDto.eventType.name) {
      const findEventType = await this.eventTypeRepository.findOne({
        where: { name: eventType.name },
      });

      if (findEventType) {
        storedEventType = findEventType;
      } else {
        const newEventType = await this.eventTypeRepository.create({
          name: eventType.name,
        });
        storedEventType = await this.eventTypeRepository.save(newEventType);
      }
    }

    let storedLocation;
    if (location.country || location.city) {
      // exists?
      const findLocation = await this.locationRepository.findOne({
        where: {
          city: location.city,
          country: location.country,
        },
      });

      if (findLocation) {
        storedLocation = findLocation;
      } else {
        const locationEntity = await this.locationRepository.create({
          city: location.city,
          country: location.country,
        });
        storedLocation = await this.locationRepository.save(locationEntity);
      }
    }

    const event: Event = await this.eventRepository.create({
      name: name,
      user,
      eventType: storedEventType,
      location: storedLocation,
      maxPeople,
      dateFrom,
      dateTo,
      description,
      details,
    });

    return await this.eventRepository.save(event);
  }

  findOne(id: string): Promise<Event> {
    return this.eventRepository.findOne(
      { id },
      { relations: ['eventType', 'user', 'location', 'request'] },
    );
  }

  async findMyEvents(user: User): Promise<Event[]> {
    const userEvents = await this.eventRepository.find({ where: { user } });
    if (!userEvents) {
      throw new HttpException('user has no events', HttpStatus.NOT_FOUND);
    }
    return await this.eventRepository.find({ where: { user } });
  }

  findAll(): Promise<Event[]> {
    return this.eventRepository.find({
      relations: ['user', 'eventType', 'location', 'request'],
    });
  }
}
