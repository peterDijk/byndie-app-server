import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateUserDto,
  CreateUserDtoOpt,
  LoginUserDto,
  UserDto,
  UserOutput,
} from '../users/user.dto';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { IsLoggedIn, LoginStatus } from './auth.dto';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './graphql.guard';

@Resolver((of) => User)
export class AuthResolver {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UsersService) private usersService: UsersService,
  ) {}

  @Mutation((returns) => UserOutput, { description: 'register a new user' })
  async register(@Args('input') userDto: CreateUserDtoOpt): Promise<User> {
    return await this.authService.register(userDto);
  }

  @Mutation((returns) => LoginStatus, { description: 'login to get a token' })
  async login(@Args('input') { username, password }: LoginUserDto) {
    const result = await this.authService.login({ username, password });
    console.log({ result });
    return result;
  }

  @Query((returns) => IsLoggedIn)
  @UseGuards(GqlAuthGuard)
  async isLoggedIn() {
    return {
      status: true,
    };
  }
}
