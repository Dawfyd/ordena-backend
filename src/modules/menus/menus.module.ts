import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Menu } from './entities/menu.entity';

import { MenusService } from './menus.service';
import { MenusLoaders } from './menus.loaders';
import { MenusResolver } from './menus.resolver';

import { VenuesModule } from '../venues/venues.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]),
    VenuesModule
  ],
  providers: [MenusService, MenusLoaders, MenusResolver],
  exports: [MenusService]
})
export class MenusModule {}
