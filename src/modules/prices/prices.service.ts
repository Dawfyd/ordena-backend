import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { CreatePriceInput } from './dto/create-price.input';
import { UpdatePriceInput } from './dto/update-price.input';
import { Price } from './entities/price.entity';

@Injectable()
export class PricesService {
  constructor (
    @InjectRepository(Price)
    private readonly PriceRepository: Repository<Price>,
    private readonly productsService: ProductsService
  ) {}

  async create (createPriceInput: CreatePriceInput): Promise<Price> {
    const { product_id } = createPriceInput;
    // TODO: fix
    const product = {};
    const newPrice = this.PriceRepository.create({ ...createPriceInput, product });
    return await this.PriceRepository.save(newPrice);
  }

  async findAll (): Promise<Price[]> {
    return await this.PriceRepository.find();
  }

  async findOne (id: number): Promise<Price> {
    const price = await this.PriceRepository.findOne(id);
    if (!price) throw new NotFoundException('No hay un precio con esa ID');
    return price;
  }

  async update (id: number, updatePriceInput: UpdatePriceInput) {
    const price = await this.findOne(id);

    const { product_id } = updatePriceInput;
    // TODO: fix
    const product = {};
    const editedPrice = this.PriceRepository.merge(price, { ...updatePriceInput, product });
    return await this.PriceRepository.save(editedPrice);
  }

  async remove (id: number) {
    const price = await this.findOne(id);
    return await this.PriceRepository.remove(price);
  }
}
