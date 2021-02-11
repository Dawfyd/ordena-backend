import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusService } from './menus.service';
import { MenusResolver } from './menus.resolver';
import { Menu } from './entities/menu.entity';
import { VenuesModule } from '../venues/venues.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Menu]),
    forwardRef(() => VenuesModule), forwardRef(() => CategoriesModule)],
  providers: [MenusResolver, MenusService],
  exports: [MenusService]
})
export class MenusModule {}
