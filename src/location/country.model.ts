import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { City } from './city.model';

// @InputType()
@ObjectType()
@Entity('countries')
export class Country extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Field((type) => [City], { name: 'CountryCities' })
  @OneToMany((type) => City, (city) => city.cityCountry)
  cities: City[];
}
