import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { BranchOfficesModule } from './branch-offices/branch-offices.module';
import { MenusModule } from './menus/menus.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ModifiersModule } from './modifiers/modifiers.module';
import { PricesModule } from './prices/prices.module';
import { ProductsOrderedModule } from './products-ordered/products-ordered.module';
import { OrdersModule } from './orders/orders.module';
import { SpotsModule } from './spots/spots.module';
import { RolesModule } from './roles/roles.module';
import { PersonsModule } from './persons/persons.module';
import { FavoritesModule } from './favorites/favorites.module';
import { RolesPersonsModule } from './roles-persons/roles-persons.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CustomersModule,
    BranchOfficesModule, 
    MenusModule, 
    CategoriesModule, 
    ProductsModule, 
    ModifiersModule, 
    PricesModule, 
    ProductsOrderedModule, 
    OrdersModule, 
    SpotsModule, 
    RolesModule, 
    PersonsModule, 
    FavoritesModule, 
    RolesPersonsModule,

    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      introspection: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 8080,
      username: 'ordena',
      password: 'root',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
