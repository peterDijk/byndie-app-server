import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  Column,
  ManyToOne,
} from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../users/user.model';
import { UserDto } from '../users/user.dto';
import { EventType } from '../eventtype/eventtype.model';
import { Location } from '../location/location.model';
import { LocationOutput } from '../location/location.dto';

// @InputType()
@ObjectType()
@Entity()
export class Event extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Field((type) => EventType)
  @OneToMany((type) => EventType, (eventType) => eventType.events)
  eventType: EventType;

  @Field((type) => LocationOutput)
  @OneToMany((type) => Location, (location) => location.events)
  location: Location;

  @Field()
  @Column({
    type: 'int',
    nullable: false,
  })
  maxPeople: number;

  @Field()
  @Column({
    type: 'timestamptz',
    nullable: false,
    default: () => `now()`,
  })
  dateFrom: Date;

  @Field()
  @Column({
    type: 'timestamptz',
    nullable: false,
    default: () => `now()`,
  })
  dateTo: Date;

  @Field()
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Field()
  @Column({
    type: 'text',
    nullable: false,
  })
  details: string;
}
