import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Location } from '../location/location.model';
import config from '../../config';
import { LocationInput } from '../location/location.dto';
import { Optional } from '@nestjs/common';

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

  @Field()
  @Optional()
  @IsEmail()
  firstName?: string;

  @Field()
  @Optional()
  @IsEmail()
  lastName?: string;

  @Field((type) => LocationInput)
  location?: Location;
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
