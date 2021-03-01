import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { Location } from '../location/location.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Location)
    private locationRepo: Repository<Location>,
  ) {}

  async findOne(options?: unknown): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);
    return user;
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByPayload({ username }: { username: string }): Promise<UserDto> {
    return await this.findOne({
      where: { username },
    });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const {
      password,
      email,
      username,
      firstName,
      lastName,
      location,
    } = userDto;

    // check if the user exists in the db
    const userInDb = await this.userRepo.findOne({
      where: [{ username }, { email }],
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const locationEntity = await this.locationRepo.create({
        city: location.city,
        country: location.country,
      });
      const storedLocation = await this.locationRepo.save(locationEntity);

      const user: User = await this.userRepo.create({
        username,
        password,
        email,
        firstName,
        lastName,
        userLocation: storedLocation, // this has to refer to a specific Location item
      });

      await this.userRepo.save(user);

      return user;
    } catch (err) {
      throw Error(err);
    }
  }
}
