import { Module } from '@nestjs/common';
import { RolesPersonsService } from './roles-persons.service';
import { RolesPersonsResolver } from './roles-persons.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesPerson } from './entities/roles-person.entity';
import { RolesModule } from '../roles/roles.module';
import { PersonsModule } from '../persons/persons.module';

@Module({
  imports: [TypeOrmModule.forFeature([RolesPerson]),
  RolesModule, PersonsModule],
  providers: [RolesPersonsResolver, RolesPersonsService],
})
export class RolesPersonsModule {}
