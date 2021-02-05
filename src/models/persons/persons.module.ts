import { forwardRef, Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsResolver } from './persons.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { FavoritesModule } from '../favorites/favorites.module';
import { BasicAclModule } from 'src/common/integrations/basic-acl/basic-acl.module';
import { ParametersModule } from '../parameters/parameters.module';

@Module({
  imports: [TypeOrmModule.forFeature([Person]),
  forwardRef(() => FavoritesModule),
  BasicAclModule, ParametersModule],
  providers: [PersonsResolver, PersonsService],
  exports: [PersonsService]
})
export class PersonsModule {}
