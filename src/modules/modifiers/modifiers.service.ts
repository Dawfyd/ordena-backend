import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { CreateModifierInput } from './dto/create-modifier.input';
import { UpdateModifierInput } from './dto/update-modifier.input';
import { Modifier } from './entities/modifier.entity';

@Injectable()
export class ModifiersService {
  constructor (
    @InjectRepository(Modifier)
    private readonly ModifierRepository: Repository<Modifier>,
    private readonly productsSerice: ProductsService
  ) {}

  async create (createModifierInput: CreateModifierInput): Promise<Modifier> {
    const { product_id } = createModifierInput;

    const product = await this.productsSerice.findOne(product_id);

    const newModifier = this.ModifierRepository.create({ ...createModifierInput, product });
    return await this.ModifierRepository.save(newModifier);
  }

  async findAll (): Promise<Modifier[]> {
    return await this.ModifierRepository.find();
  }

  async findOne (id: number): Promise<Modifier> {
    const modifier = await this.ModifierRepository.findOne(id);
    if (!modifier) { throw new NotFoundException('No hay un modificador con esa ID'); }
    return modifier;
  }

  async findModifierProduct (product: number): Promise<Modifier[]> {
    return await this.ModifierRepository.find({
      where: {
        product
      }
    });
  }

  async update (id: number, updateModifierInput: UpdateModifierInput) {
    const modifier = await this.findOne(id);

    const { product_id } = updateModifierInput;

    const product = await this.productsSerice.findOne(product_id);

    const editedModifier = this.ModifierRepository.merge(modifier, { ...updateModifierInput, product });
    return await this.ModifierRepository.save(editedModifier);
  }

  async remove (id: number) {
    const modifier = await this.findOne(id);
    return await this.ModifierRepository.remove(modifier);
  }
}
