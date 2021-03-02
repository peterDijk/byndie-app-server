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
import { Event } from '../event/event.model';

// @InputType()
@ObjectType()
@Entity()
export class EventType extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Field((type) => [Event])
  @OneToMany((type) => Event, (event) => event.eventType)
  events: Event[];
}
