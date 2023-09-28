import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from 'src/etc/service/page/page.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends PageService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {
    super();
  }
  create(createProductDto: CreateProductDto) {
    return this.productRepo.save(createProductDto);
  }

  findAll(filter) {
    return this.generatePage(filter, this.productRepo, { relations: ['user'] });
    // return this.produkRepo.find({relations:['user']});
  }

  findOne(id: number) {
    return this.productRepo.findOne(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    updateProductDto.id = id;
    return this.productRepo.save(updateProductDto);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOne(id);
    return this.productRepo.remove(product);
  }
}
