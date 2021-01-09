import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusResolver } from './menus.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu])
  ],
  providers: [MenusResolver, MenusService]
})
export class MenusModule {}
