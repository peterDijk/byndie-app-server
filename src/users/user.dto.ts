import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import config from '../../config';

@ObjectType()
export class UserDto {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;
}

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(config.MIN_PW_LENGTH)
  password: string;
}

@InputType()
export class LoginUserDto {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  password: string;
}
