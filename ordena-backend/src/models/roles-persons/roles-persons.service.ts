import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolesPersonInput } from './dto/create-roles-person.input';
import { UpdateRolesPersonInput } from './dto/update-roles-person.input';
import { RolesPerson } from './entities/roles-person.entity';

@Injectable()
export class RolesPersonsService {
  constructor(
    @InjectRepository(RolesPerson)
    private readonly RolesPersonRepository: Repository<RolesPerson>,
  ) {}

  async create(
    createRolesPersonInput: CreateRolesPersonInput,
  ): Promise<RolesPerson> {
    const newRolesPerson = this.RolesPersonRepository.create(
      createRolesPersonInput,
    );
    return await this.RolesPersonRepository.save(newRolesPerson);
  }

  async findAll(): Promise<RolesPerson[]> {
    return await this.RolesPersonRepository.find();
  }

  async findOne(id: number): Promise<RolesPerson> {
    const role_person = await this.RolesPersonRepository.findOne(id);
    if (!role_person)
      throw new NotFoundException(
        'No hay un rol asignado a una persona con esa ID',
      );
    return role_person;
  }

  async update(id: number, updateRolesPersonInput: UpdateRolesPersonInput) {
    const role_person = await this.RolesPersonRepository.findOne(id);
    if (!role_person)
      throw new NotFoundException(
        'No hay un rol asignado a una persona con esa ID',
      );

    const editedRolesPerson = Object.assign(
      role_person,
      updateRolesPersonInput,
    );
    return await this.RolesPersonRepository.save(editedRolesPerson);
  }

  async remove(id: number) {
    const role_person = await this.RolesPersonRepository.findOne(id);
    if (!role_person)
      throw new NotFoundException(
        'No hay un rol asignado a una persona con esa ID',
      );
    return await this.RolesPersonRepository.remove(role_person);
  }
}
