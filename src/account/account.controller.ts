import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import {
  CreateAccountDto,
  FindAccount,
  AccountIdDto,
  ResponseAccountDto,
} from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { InjectUser } from 'src/etc/decorator/inject-user.decorator';

@ApiTags('Rekening')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('rekening')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiBody({ type: CreateAccountDto })
  create(@InjectUser() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseAccountDto })
  findAll(@Query() filter: FindAccount) {
    return this.accountService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateAccountDto })
  update(
    @Param('id') id: string,
    @InjectUser() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param() id: AccountIdDto) {
    return this.accountService.remove(id.id);
  }
}
