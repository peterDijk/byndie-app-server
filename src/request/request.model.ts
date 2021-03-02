import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../users/user.model';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from '../event/event.model';

@ObjectType()
@Entity()
export class Request extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  accepted: boolean;

  @Field((type) => User)
  @ManyToOne((type) => User)
  user: User;

  @Field((type) => Event)
  @ManyToOne((type) => Event, (event) => event.requests)
  event: Event;
}
