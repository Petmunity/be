import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { SignUpRequestDto } from './dto/signUp.request.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({ summary: '유저 목록' })
  @Get()
  getUsers(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  postSignUp(@Body() data: SignUpRequestDto) {
    this.usersService.postSignUp(data);
  }

  @ApiOperation({ summary: '유저 상세' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: '유저 id',
  })
  @Get(':id')
  //   getUser(@Query('perPage') pgwgw) {}
  getUser(@Param() param) {
    this.usersService.getUser();
    console.log(param.id);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  postLogin() {}

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  postLogout(@Req() req, @Res() res) {
    res.logout();
    res.send('ok');
  }
}
