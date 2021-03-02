import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EventTypeInput {
  @Field()
  name: string;
}
