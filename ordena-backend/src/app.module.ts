import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { ServicesModule } from './models/services/services.module';
import { AssignedCategoriesModule } from './models/assigned-categories/assigned-categories.module';
import { ProductTypesModule } from './models/product-types/product-types.module';

import appConfig from './config/app.config';
import appConfigSchema from './config/app.config.schema';

const NODE_ENV = process.env.NODE_ENV || 'local';
const envPath = path.resolve(__dirname, `../.env.${NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPath,
      load: [appConfig],
      validationSchema: appConfigSchema
    }),
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
    ServicesModule,
    AssignedCategoriesModule,
    ProductTypesModule,

    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      introspection: true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production'
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
