import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { City } from './city.model';
import { Country } from './country.model';
import { User } from '../users/user.model';
import { UserDto } from '../users/user.dto';

// @InputType()
@ObjectType()
@Entity()
export class Location extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({
  //   type: 'varchar',
  //   nullable: true,
  // })
  // country: string;

  // @Column({
  //   type: 'varchar',
  //   nullable: true,
  // })
  // city: string;

  @Field((type) => City, { name: 'LocationCity' })
  @OneToOne((type) => City)
  locationCity: City;

  @Field((type) => Country, { name: 'LocationCountry' })
  @OneToOne((type) => Country)
  locationCountry: Country;

  @Field((type) => [UserDto], { name: 'LocationUsers' })
  @OneToMany((type) => User, (user) => user.userLocation)
  users: User[];
}
