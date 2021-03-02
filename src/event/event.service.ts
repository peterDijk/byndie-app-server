import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.model';
import {
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { EventInput, FilterInput } from './event.dto';
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
      {
        relations: [
          'eventType',
          'user',
          'location',
          'requests',
          'requests.user',
        ],
      },
    );
  }

  async findMyEvents(user: User, filter?: FilterInput): Promise<Event[]> {
    const userEvents = await this.eventRepository.find({ where: { user } });
    if (!userEvents) {
      throw new HttpException('user has no events', HttpStatus.NOT_FOUND);
    }

    let ormFilter: FindManyOptions<Event>;
    const { eventType, dateTo, dateFrom } = filter ?? {
      eventType: null,
      dateFrom: null,
      dateTo: null,
    };

    if (eventType) {
      const storedEventType = await this.eventTypeRepository.findOne({
        where: { name: filter.eventType.name },
      });
      if (storedEventType) {
        ormFilter = { eventType: storedEventType } as FindManyOptions<Event>;
      }
    }

    if (dateFrom) {
      ormFilter = {
        ...ormFilter,
        dateFrom: MoreThanOrEqual(filter.dateFrom),
      } as FindManyOptions<Event>;
    }

    if (dateTo) {
      ormFilter = {
        ...ormFilter,
        dateTo: LessThanOrEqual(filter.dateTo),
      } as FindManyOptions<Event>;
    }

    return await this.eventRepository.find({
      where: { user, ...ormFilter },
      relations: ['user', 'eventType', 'location', 'requests', 'requests.user'],
    });
  }

  async findAll(filter?: FilterInput): Promise<Event[]> {
    let ormFilter: FindManyOptions<Event>;
    const { eventType, dateTo, dateFrom } = filter ?? {
      eventType: null,
      dateFrom: null,
      dateTo: null,
    };

    if (eventType) {
      const storedEventType = await this.eventTypeRepository.findOne({
        where: { name: filter.eventType.name },
      });
      if (storedEventType) {
        ormFilter = { eventType: storedEventType } as FindManyOptions<Event>;
      }
    }

    if (dateFrom) {
      ormFilter = {
        ...ormFilter,
        dateFrom: MoreThanOrEqual(filter.dateFrom),
      } as FindManyOptions<Event>;
    }

    if (dateTo) {
      ormFilter = {
        ...ormFilter,
        dateTo: LessThanOrEqual(filter.dateTo),
      } as FindManyOptions<Event>;
    }

    return this.eventRepository.find({
      where: { ...ormFilter },
      relations: ['user', 'eventType', 'location', 'requests', 'requests.user'],
    });
  }

  findAllEventTypes(): Promise<EventType[]> {
    return this.eventTypeRepository.find();
  }

  findAllLocations(): Promise<Location[]> {
    return this.locationRepository.find();
  }
}
