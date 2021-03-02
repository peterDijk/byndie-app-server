import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { IsString, MinLength, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import config from '../../config';
import { Field, ObjectType } from '@nestjs/graphql';
import { Location } from '../location/location.model';
import { Event } from '../event/event.model';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  username: string;

  @Field()
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @Field()
  @Exclude({ toPlainOnly: true })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Field()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  firstName: string;

  @Field()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  lastName: string;

  @Field((type) => Location, { name: 'UserLocation' })
  @ManyToOne((type) => Location, (location) => location.users)
  location: Location;

  @OneToMany((type) => Event, (event) => event.user)
  events: Event[];

  @BeforeInsert() async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
      throw Error('error hashing password');
    }
  }
}
