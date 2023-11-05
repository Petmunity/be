import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { SignUpRequestDto } from './dto/signUp.request.dto';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers(@Req() req) {
    return req.user;
  }

  @Post()
  postSignUp(@Body() data: SignUpRequestDto) {
    this.usersService.postSignUp(data);
  }

  @Get(':id')
  //   getUser(@Query('perPage') pgwgw) {}
  getUser(@Query() query) {
    this.usersService.getUser();
    console.log(query.perPage);
  }

  @Post('login')
  postLogin() {}

  @Post('logout')
  postLogout(@Req() req, @Res() res) {
    res.logout();
    res.send('ok');
  }
}
