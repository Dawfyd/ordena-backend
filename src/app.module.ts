import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule, GraphQLSchemaHost } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { applyMiddleware } from 'graphql-middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './models/companies/companies.module';
import { VenuesModule } from './models/venues/venues.module';
import { MenusModule } from './models/menus/menus.module';
import { CategoriesModule } from './models/categories/categories.module';
import { ProductsModule } from './models/products/products.module';
import { ModifiersModule } from './models/modifiers/modifiers.module';
import { PricesModule } from './models/prices/prices.module';
import { RequestsModule } from './models/requests/requests.module';
import { OrdersModule } from './models/orders/orders.module';
import { SpotsModule } from './models/spots/spots.module';
import { PersonsModule } from './models/persons/persons.module';
import { FavoritesModule } from './models/favorites/favorites.module';
import { ServicesModule } from './models/services/services.module';
import { AssignedCategoriesModule } from './models/assigned-categories/assigned-categories.module';
import { ProductTypesModule } from './models/product-types/product-types.module';
import { AssignedProductsModule } from './models/assigned-products/assigned-products.module';
import { BasicAclModule } from './common/integrations/basic-acl/basic-acl.module';
import { ParametersModule } from './models/parameters/parameters.module';
import {permission} from './permissions/permissions';
import { CustomerAssignedSpotsModule } from './models/customer-assigned-spots/customer-assigned-spots.module';
import { AssignedVenuesModule } from './models/assigned-venues/assigned-venues.module';
import { WaiterAssignedSpotsModule } from './models/waiter-assigned-spots/waiter-assigned-spots.module';
import { OrderStatusesModule } from './models/order-statuses/order-statuses.module';
import { RequestStatusesModule } from './models/request-statuses/request-statuses.module';
import { AdditionalsPerRequestsModule } from './models/additionals-per-requests/additionals-per-requests.module';
import { ModifiersPerRequestModule } from './models/modifiers-per-request/modifiers-per-request.module';

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

    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      introspection: true,
      transformSchema: (schema: GraphQLSchemaHost['schema']) => {
        schema = applyMiddleware(schema, permission.permissions);
        return schema;
      }
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
    }),

    CompaniesModule,
    VenuesModule,
    MenusModule,
    CategoriesModule,
    ProductsModule,
    ModifiersModule,
    PricesModule,
    RequestsModule,
    OrdersModule,
    SpotsModule,
    PersonsModule,
    FavoritesModule,
    ServicesModule,
    AssignedCategoriesModule,
    ProductTypesModule,
    ParametersModule
    BasicAclModule,
    AssignedProductsModule,
    CustomerAssignedSpotsModule,
    AssignedVenuesModule,
    WaiterAssignedSpotsModule,
    OrderStatusesModule,
    RequestStatusesModule,
    AdditionalsPerRequestsModule,
    ModifiersPerRequestModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
