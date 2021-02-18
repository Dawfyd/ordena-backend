import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule, GraphQLSchemaHost } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { applyMiddleware } from 'graphql-middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './modules/companies/companies.module';
import { VenuesModule } from './modules/venues/venues.module';
import { MenusModule } from './modules/menus/menus.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { ModifiersModule } from './modules/modifiers/modifiers.module';
import { PricesModule } from './modules/prices/prices.module';
import { RequestsModule } from './modules/requests/requests.module';
import { OrdersModule } from './modules/orders/orders.module';
import { SpotsModule } from './modules/spots/spots.module';
import { PersonsModule } from './modules/persons/persons.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { AssignedCategoriesModule } from './modules/assigned-categories/assigned-categories.module';
import { ProductTypesModule } from './modules/product-types/product-types.module';
import { AssignedProductsModule } from './modules/assigned-products/assigned-products.module';
import { BasicAclModule } from './common/integrations/basic-acl/basic-acl.module';
import { ParametersModule } from './modules/parameters/parameters.module';
import { permission } from './permissions/permissions';
import { CustomerAssignedSpotsModule } from './modules/customer-assigned-spots/customer-assigned-spots.module';
import { AssignedVenuesModule } from './modules/assigned-venues/assigned-venues.module';
import { WaiterAssignedSpotsModule } from './modules/waiter-assigned-spots/waiter-assigned-spots.module';
import { OrderStatusesModule } from './modules/order-statuses/order-statuses.module';
import { RequestStatusesModule } from './modules/request-statuses/request-statuses.module';
import { AdditionalsPerRequestsModule } from './modules/additionals-per-requests/additionals-per-requests.module';
import { ModifiersPerRequestModule } from './modules/modifiers-per-request/modifiers-per-request.module';
import { ProductsInVenueModule } from './modules/products-in-venue/products-in-venue.module';

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
      installSubscriptionHandlers: true,
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
        synchronize: process.env.NODE_ENV !== 'production',
        logging: true
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
    AssignedCategoriesModule,
    ProductTypesModule,
    ParametersModule,
    BasicAclModule,
    AssignedProductsModule,
    CustomerAssignedSpotsModule,
    AssignedVenuesModule,
    WaiterAssignedSpotsModule,
    OrderStatusesModule,
    RequestStatusesModule,
    AdditionalsPerRequestsModule,
    ModifiersPerRequestModule,
    ProductsInVenueModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
