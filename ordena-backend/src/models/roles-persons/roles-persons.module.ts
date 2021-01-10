import { Module } from '@nestjs/common';
import { RolesPersonsService } from './roles-persons.service';
import { RolesPersonsResolver } from './roles-persons.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesPerson } from './entities/roles-person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesPerson])],
  providers: [RolesPersonsResolver, RolesPersonsService],
})
export class RolesPersonsModule {}
