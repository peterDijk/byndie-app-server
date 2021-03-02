import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';
import { LocationModule } from '../location/location.module';
import { Location } from '../location/location.model';

@Module({
  imports: [
    forwardRef(() => LocationModule),
    TypeOrmModule.forFeature([User, Location]),
  ],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
