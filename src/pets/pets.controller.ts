import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in-guard';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { NotLoggedInGuard } from 'src/auth/not-logged-in-guard';
import { PetsService } from './pets.service';
import { RegisterRequestDto } from './dto/request.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Pets')
@Controller('pets')
@ApiBearerAuth('JWT-auth')
export class PetsController {
  constructor(private petsService: PetsService) {}
  @UseGuards(LoggedInGuard)
  @ApiOperation({ summary: '강아지 등록' })
  @Post('/register')
  async postRegister(@Body() body: RegisterRequestDto) {
    await this.petsService.register({ ...body, userId: 13 });
  }

  @UseGuards(LoggedInGuard)
  @ApiOperation({ summary: '유저 목록' })
  @Get()
  getUsers(@User() user) {
    return user;
  }

  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async postSignUp(@Body() body: RegisterRequestDto) {}

  @UseGuards(LoggedInGuard)
  @ApiOperation({ summary: '유저 상세' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: '유저 id',
  })
  @Get(':id')
  getUser(@Param() param) {
    // this.usersService.getUser();
    console.log(param.id);
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  postLogin() {}

  @UseGuards(LoggedInGuard)
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  postLogout(@Req() req, @Res() res) {
    res.logout();
    res.send('ok');
  }
}
