import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePriceInput } from './dto/create-price.input';
import { UpdatePriceInput } from './dto/update-price.input';
import { Price } from './entities/price.entity';

@Injectable()
export class PricesService {

  constructor(
    @InjectRepository(Price)
    private readonly PriceRepository : Repository<Price>
  ) {}

  async create(createPriceInput: CreatePriceInput):Promise<Price> {
  const newPrice = this.PriceRepository.create(createPriceInput)
    return await this.PriceRepository.save(newPrice);
  }

  async findAll():Promise<Price[]>{
    return await this.PriceRepository.find();
  }

  async findOne(id: number):Promise<Price>{
    const price = await this.PriceRepository.findOne(id);
    if (!price) throw new NotFoundException('No hay un precio con esa ID');
    return price;
  }

  async update(id: number, updatePriceInput: UpdatePriceInput) {
    const price = await this.PriceRepository.findOne(id);
    if (!price) throw new NotFoundException('No hay un precio con esa ID');
    
    const editedPrice = Object.assign(price, updatePriceInput);
    return await this.PriceRepository.save(editedPrice);
  }

  async remove(id: number) {
    const price = await this.PriceRepository.findOne(id);
    if (!price) throw new NotFoundException('No hay un precio con esa ID');
    return await this.PriceRepository.remove(price);
  }
}
