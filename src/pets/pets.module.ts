import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Pets } from 'src/entities/Pets';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { Groups } from 'src/entities/Groups';

@Module({
  imports: [TypeOrmModule.forFeature([Pets, Groups])],
  providers: [PetsService],
  controllers: [PetsController],
  exports: [PetsService],
})
export class PetsModule {}
