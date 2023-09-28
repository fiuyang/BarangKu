import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ExistValidator } from './etc/validator/exist-validator';
import { UniqueValidator } from './etc/validator/unique-validator';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { AccountModule } from './account/account.module';
import { PenjualanModule } from './sale/penjualan.module';
import { PageService } from './etc/service/page/page.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/**/*.entities{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    CustomerModule,
    AccountModule,
    PenjualanModule,
  ],
  controllers: [AppController],
  providers: [AppService, ExistValidator, UniqueValidator, PageService],
})
export class AppModule {}
