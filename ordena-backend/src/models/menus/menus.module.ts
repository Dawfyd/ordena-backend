import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusResolver } from './menus.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { CategoriesModule } from 'src/models/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Menu]), 
  CategoriesModule],
  providers: [MenusResolver, MenusService],
})
export class MenusModule {}
