import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModifierInput } from './dto/create-modifier.input';
import { UpdateModifierInput } from './dto/update-modifier.input';
import { Modifier } from './entities/modifier.entity';

@Injectable()
export class ModifiersService {
  constructor(
    @InjectRepository(Modifier)
    private readonly ModifierRepository: Repository<Modifier>,
  ) {}

  async create(createModifierInput: CreateModifierInput): Promise<Modifier> {
    const newModifier = this.ModifierRepository.create(createModifierInput);
    return await this.ModifierRepository.save(newModifier);
  }

  async findAll(): Promise<Modifier[]> {
    return await this.ModifierRepository.find();
  }

  async findOne(id: number): Promise<Modifier> {
    const modifier = await this.ModifierRepository.findOne(id);
    if (!modifier)
      throw new NotFoundException('No hay un modificador con esa ID');
    return modifier;
  }

  async update(id: number, updateModifierInput: UpdateModifierInput) {
    const modifier = await this.ModifierRepository.findOne(id);
    if (!modifier)
      throw new NotFoundException('No hay un modificador con esa ID');

    const editedModifier = Object.assign(modifier, updateModifierInput);
    return await this.ModifierRepository.save(editedModifier);
  }

  async remove(id: number) {
    const modifier = await this.ModifierRepository.findOne(id);
    if (!modifier)
      throw new NotFoundException('No hay un modificador con esa ID');
    return await this.ModifierRepository.remove(modifier);
  }
}
