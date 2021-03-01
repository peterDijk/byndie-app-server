import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/user.model';
import { UsersModule } from '../users/users.module';
import { Location } from './location.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
    // AuthModule,
  ],
  providers: [
    // HealthService,
    // HealthCheckResolver, // for graphql
  ],
  // exports: [HealthService],
})
export class LocationModule {}
