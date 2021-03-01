import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfig from '../ormconfig';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    AuthModule,
    HealthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      introspection: process.env.GQL_PLAYGROUND === 'enabled' ? true : false,
      playground: process.env.GQL_PLAYGROUND === 'enabled' ? true : false,
    }),
    TypeOrmModule.forRoot(TypeOrmConfig),
  ],
})
export class AppModule {}
