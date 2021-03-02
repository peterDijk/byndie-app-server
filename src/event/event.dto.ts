import { Field, InputType } from '@nestjs/graphql';
import { EventTypeInput } from '../eventtype/eventtype.dto';
import { EventType } from '../eventtype/eventtype.model';

@InputType()
export class EventInput {
  @Field()
  name: string;

  @Field((type) => EventTypeInput)
  eventType: EventType;
}
