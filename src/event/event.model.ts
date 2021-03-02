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
import { UserDto, UserOutput } from '../users/user.dto';
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

  @Field((type) => EventType, { nullable: true })
  @ManyToOne((type) => EventType, (eventType) => eventType.events)
  eventType: EventType;

  @Field((type) => LocationOutput, { nullable: true })
  @ManyToOne((type) => Location, (location) => location.events)
  location: Location;

  @Field((type) => UserOutput, { nullable: true })
  @ManyToOne((type) => User, (user) => user.events)
  user: User;

  @Field()
  @Column({
    type: 'int',
    nullable: false,
    default: 1,
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

  @Field({ nullable: true })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Field({ nullable: true })
  @Column({
    type: 'text',
    nullable: true,
  })
  details: string;
}
