import { Optional } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CityInput {
  @Field()
  name: string;
}

@InputType()
export class CountryInput {
  @Field()
  name: string;
}

@InputType()
export class LocationInput {
  @Field()
  @Optional()
  country: string;

  @Field()
  @Optional()
  city: string;
}

@ObjectType()
export class LocationOutput {
  @Field()
  country: string;

  @Field()
  city: string;
}
