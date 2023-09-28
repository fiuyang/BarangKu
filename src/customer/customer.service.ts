import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from 'src/etc/service/page/page.service';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService extends PageService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {
    super();
  }
  create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepo.save(createCustomerDto);
  }

  findAll(filter) {
    return this.generatePage(filter, this.customerRepo, {
      relations: ['user'],
    });
  }

  findOne(id: number) {
    return this.customerRepo.findOne(id);
  }

  update(id: number, UpdateCustomerDto: UpdateCustomerDto) {
    return this.customerRepo.save(UpdateCustomerDto);
  }

  async remove(id: number) {
    const customer = await this.customerRepo.findOne(id);
    return this.customerRepo.remove(customer);
  }
}
