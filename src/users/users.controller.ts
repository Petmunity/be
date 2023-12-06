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
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in-guard';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { UsersService } from './users.service';
import { NotLoggedInGuard } from 'src/auth/not-logged-in-guard';
import { SignUpRequestDto } from './dto/signUp.request.dto';
import { JwtService } from '@nestjs/jwt';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  // @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '유저 목록' })
  @Get()
  getUsers(@User() user) {
    return user;
  }

  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async postSignUp(@Body() body: SignUpRequestDto) {
    // await this.usersService.postSignUp(
    //   body.email,
    //   body.password,
    //   body.nickname,
    // );
  }

  // @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '유저 상세' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: '유저 id',
  })
  @Get(':id')
  getUser(@Param() param) {
    this.usersService.getUser();
    console.log(param.id);
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  postLogin() {}

  // @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  postLogout(@Req() req, @Res() res) {
    res.logout();
    res.send('ok');
  }
}
