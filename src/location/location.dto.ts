import { Optional } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';

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
  country: CountryInput;

  @Field()
  @Optional()
  city: CityInput;
}
