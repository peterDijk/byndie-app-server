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
}
