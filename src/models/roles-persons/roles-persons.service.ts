import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonsService } from '../persons/persons.service';
import { RolesService } from '../roles/roles.service';
import { CreateRolesPersonInput } from './dto/create-roles-person.input';
import { UpdateRolesPersonInput } from './dto/update-roles-person.input';
import { RolesPerson } from './entities/roles-person.entity';

@Injectable()
export class RolesPersonsService {
  constructor(
    @InjectRepository(RolesPerson)
    private readonly RolesPersonRepository: Repository<RolesPerson>,
    private readonly rolesService: RolesService,
    private readonly personsService: PersonsService
  ) {}

  async create(
    createRolesPersonInput: CreateRolesPersonInput,
  ): Promise<RolesPerson> {
    const { id_person, id_role } = createRolesPersonInput;

    const person = await this.personsService.findOne(id_person);
    const role = await this.rolesService.findOne(id_role);

    const existing = await this.RolesPersonRepository.findOne({
      select: ["id_role_person"],
      where: {
        person,
        role
      }
    });

    if (existing) {
      throw new NotFoundException(`Ya existe el rol asignado ${role.name_role} para la persona ${person.username}`);
    }

    delete createRolesPersonInput.id_person;
    delete createRolesPersonInput.id_role;

    const newRolesPerson = this.RolesPersonRepository.create({
      ...createRolesPersonInput,
      //person,
      //role
    });

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

  async update(id: number, updateRolesPersonInput: UpdateRolesPersonInput): Promise<RolesPerson> {
    const role_person = await this.findOne(id);

    const { id_person, id_role } = updateRolesPersonInput;

    const person = await this.personsService.findOne(id_person);
    const role = await this.rolesService.findOne(id_role);

    const existing = await this.RolesPersonRepository.findOne({
      select: ["id_role_person"],
      where: {
        person,
        role
      }
    });

    if (existing) {
      throw new NotFoundException(`Ya existe el rol asignado ${role.name_role} para la persona ${person.username}`);
    }

    delete updateRolesPersonInput.id_person;
    delete updateRolesPersonInput.id_role;

    const editedRolesPerson = this.RolesPersonRepository.merge(role_person, {
      ...updateRolesPersonInput,
      //person,
      //role
    });

    return await this.RolesPersonRepository.save(editedRolesPerson);
  }

  async remove(id: number): Promise<RolesPerson> {
    const role_person = await this.findOne(id);
    return await this.RolesPersonRepository.remove(role_person);
  }
}
