import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from 'src/etc/service/page/page.service';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService extends PageService {
  constructor(
    @InjectRepository(Account) private accountRepo: Repository<Account>,
  ) {
    super();
  }
  create(createAccountDto: CreateAccountDto) {
    return this.accountRepo.save(createAccountDto);
  }

  findAll(filter) {
    return this.generatePage(filter, this.accountRepo, {
      relations: ['user'],
    });
  }

  findOne(id: number) {
    return this.accountRepo.findOne(id);
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    updateAccountDto.id = id;
    return this.accountRepo.save(updateAccountDto);
  }

  async remove(id: number) {
    const account = await this.accountRepo.findOne(id);
    return this.accountRepo.remove(account);
  }
}
