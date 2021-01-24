import { forwardRef, Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsResolver } from './persons.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [TypeOrmModule.forFeature([Person]),
  forwardRef(() => FavoritesModule)],
  providers: [PersonsResolver, PersonsService],
  exports: [PersonsService]
})
export class PersonsModule {}
