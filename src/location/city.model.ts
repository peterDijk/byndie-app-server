import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Country } from './country.model';

// @InputType()
@ObjectType()
@Entity('cities')
export class City extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Field((type) => Country, { name: 'CityCountry' })
  @ManyToOne((type) => Country, (country) => country.cities)
  cityCountry: Country;
}
