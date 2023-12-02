import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Customs } from './entities/Customs';
import { Groups } from './entities/Groups';
import { Meals } from './entities/Meals';
import { Pets } from './entities/Pets';
import { Showers } from './entities/Showers';
import { Toilets } from './entities/Toilets';
import { Users } from './entities/Users';
import { Walks } from './entities/Walks';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { GroupMembers } from './entities/GroupMembers';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [
    PetsModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Users,
        Pets,
        Groups,
        Meals,
        Showers,
        Toilets,
        Walks,
        Customs,
        GroupMembers,
      ],
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      charset: 'utf8mb4',
    }),
    TypeOrmModule.forFeature([Users, Pets, Groups]),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
