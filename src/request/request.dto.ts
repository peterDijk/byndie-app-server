import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RequestInput {
  @Field()
  eventId: string;
}
