import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
import { PageRequestDto, PageResponseDto } from 'src/etc/dto/page-dto';
import { IsExist } from 'src/etc/validator/exist-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Customer } from '../entities/customer.entity';

export class CustomerDto {
  @ApiProperty()
  @IsExist([Customer, 'id'])
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone_number: string;

  @IsObject()
  user: CreateUserDto;
}
export class CreateCustomerDto extends OmitType(CustomerDto, ['id']) {}
export class CustomerId extends PickType(CustomerDto, ['id']) {}

export class FindCustomerDto extends PageRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone_number: string;
}
export class ResponseCustomerDto extends PageResponseDto {
  @ApiProperty({ type: [CustomerDto] })
  data: CustomerDto[];
}
