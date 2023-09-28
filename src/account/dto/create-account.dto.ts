import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { PageRequestDto, PageResponseDto } from 'src/etc/dto/page-dto';
import { IsExist } from 'src/etc/validator/exist-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Account } from '../entities/account.entity';

export class AccountDto {
  @ApiProperty()
  @IsExist([Account, 'id'])
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  information: string;

  @ApiProperty()
  @IsString()
  type: string;

  @IsObject()
  user: CreateUserDto;
}
export class CreateAccountDto extends OmitType(AccountDto, ['id']) {}
export class AccountIdDto extends PickType(AccountDto, ['id']) {}

export class FindAccount extends PageRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;
}
export class ResponseAccountDto extends PageResponseDto {
  @ApiProperty({ type: [AccountDto] })
  data: AccountDto[];
}
