import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EventInput {
  @Field()
  name: string;
}
