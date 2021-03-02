import { Field, InputType, PartialType } from '@nestjs/graphql';
import { LocationInput } from '../location/location.dto';
import { EventTypeInput } from '../eventtype/eventtype.dto';
import { EventType } from '../eventtype/eventtype.model';
import { Location } from '../location/location.model';

@InputType()
export class EventInput {
  @Field()
  name: string;

  @Field((type) => EventTypeInput)
  eventType: EventType;

  @Field((type) => LocationInput)
  location: Location;

  @Field()
  maxPeople: number;

  @Field()
  dateFrom: Date;

  @Field()
  dateTo: Date;

  @Field()
  description: string;

  @Field()
  details: string;
}

@InputType()
export class Filter {
  @Field()
  eventType?: EventTypeInput;

  @Field()
  dateFrom?: Date;

  @Field()
  dateTo?: Date;
}

@InputType()
export class FilterInput extends PartialType(Filter) {}
