import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './models/customers/customers.module';
import { VenuesModule } from './models/venues/venues.module';
import { MenusModule } from './models/menus/menus.module';
import { CategoriesModule } from './models/categories/categories.module';
import { ProductsModule } from './models/products/products.module';
import { ModifiersModule } from './models/modifiers/modifiers.module';
import { PricesModule } from './models/prices/prices.module';
import { RequestsModule } from './models/requests/requests.module';
import { OrdersModule } from './models/orders/orders.module';
import { SpotsModule } from './models/spots/spots.module';
import { RolesModule } from './models/roles/roles.module';
import { PersonsModule } from './models/persons/persons.module';
import { FavoritesModule } from './models/favorites/favorites.module';
import { RolesPersonsModule } from './models/roles-persons/roles-persons.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    CustomersModule,
    VenuesModule,
    MenusModule,
    CategoriesModule,
    ProductsModule,
    ModifiersModule,
    PricesModule,
    RequestsModule,
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
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
