import { PickType } from '@nestjs/swagger';
import { Pets } from 'src/entities/Pets';

export class RegisterRequestDto extends PickType(Pets, [
  'name',
  'type',
  'kind',
  'age',
  'isNeuteringSurgery',
  'gender',
  'weight',
] as const) {
  images?: string;
}
