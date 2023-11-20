import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class SignUpRequestDto extends PickType(Users, ['nickname'] as const) {}
