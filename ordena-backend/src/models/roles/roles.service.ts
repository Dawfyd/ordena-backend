import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly RoleRepository: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    const newRole = this.RoleRepository.create(createRoleInput);
    return await this.RoleRepository.save(newRole);
  }

  async findAll(): Promise<Role[]> {
    return await this.RoleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.RoleRepository.findOne(id);
    if (!role) throw new NotFoundException('No hay un rol con esa ID');
    return role;
  }

  async update(id: number, updateRoleInput: UpdateRoleInput) {
    const role = await this.RoleRepository.findOne(id);
    if (!role) throw new NotFoundException('No hay un rol con esa ID');

    const editedRole = Object.assign(role, updateRoleInput);
    return await this.RoleRepository.save(editedRole);
  }

  async remove(id: number) {
    const role = await this.RoleRepository.findOne(id);
    if (!role) throw new NotFoundException('No hay un rol con esa ID');
    return await this.RoleRepository.remove(role);
  }
}
