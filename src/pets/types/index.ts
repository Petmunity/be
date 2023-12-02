import { RegisterRequestDto } from '../dto/request.dto';

export interface RegisterService extends RegisterRequestDto {
  userId: number;
}
