import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductType } from './entities/product-type.entity';
import { CreateProductTypeInput } from './dto/create-product-type-input.dto';
import { UpdateProductTypeInput } from './dto/update-product-type-input.dto';
import { FindAllProductTypeInput } from './dto/find-all-product-type-input.dto';
import { FindOneProductTypeInput } from './dto/find-one-product-type-input.dto';
import { FindOneCodeProductTypeInput } from './dto/find-one-code-product-type-input.dto';

@Injectable()
export class ProductTypesService {
  constructor (
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>
  ) {}

  /* CRUD RELATED OPERATIONS */

  public async create (createProductTypeInput: CreateProductTypeInput): Promise<ProductType> {
    const newProductType = this.productTypeRepository.create(createProductTypeInput);
    return await this.productTypeRepository.save(newProductType);
  }

  public async findAll (findAllProductTypeInput: FindAllProductTypeInput): Promise<ProductType[]> {
    const { limit, skip, search } = findAllProductTypeInput;

    const query = this.productTypeRepository.createQueryBuilder('pt');

    if (search) {
      query.where('pt.name ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('pt.id', 'DESC');

    const productType = await query.getMany();

    return productType;
  }

  public async findOne (findOneProductTypeInput: FindOneProductTypeInput): Promise<ProductType | null> {
    const { id } = findOneProductTypeInput;
    const productType = await this.productTypeRepository.findOne(id);
    return productType || null;
  }

  public async findOneCode (findOneCodeProductTypeInput: FindOneCodeProductTypeInput): Promise<ProductType> {
    const { code } = findOneCodeProductTypeInput;

    const productType = await this.productTypeRepository.findOne({
      where: {
        code
      }
    });

    if (!productType) throw new NotFoundException(`can't get the product type with code ${code}`);

    return productType;
  }

  public async update (findOneProductTypeInput: FindOneProductTypeInput, updateProductTypeInput: UpdateProductTypeInput): Promise<ProductType> {
    const existing = await this.findOne(findOneProductTypeInput);

    if (!existing) {
      throw new NotFoundException(`can't get the product type with id ${findOneProductTypeInput.id}.`);
    }

    const preloaded = await this.productTypeRepository.preload({
      id: existing.id,
      ...updateProductTypeInput
    });

    const saved = await this.productTypeRepository.save(preloaded);

    return saved;
  }

  public async remove (findOneProductTypeInput: FindOneProductTypeInput): Promise<ProductType> {
    const existing = await this.findOne(findOneProductTypeInput);

    if (!existing) {
      throw new NotFoundException(`can't get the product type with id ${findOneProductTypeInput.id}.`);
    }

    const clone = { ...existing };

    await this.productTypeRepository.remove(existing);

    return clone;
  }

  /* CRUD RELATED OPERATIONS */

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  public async getByIds (ids: number[]): Promise<ProductType[]> {
    return this.productTypeRepository.findByIds(ids, {
      loadRelationIds: true
    });
  }

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */

  public async products (productType: ProductType): Promise<any[]> {
    const { id } = productType;

    const master = await this.productTypeRepository.createQueryBuilder('pt')
      .leftJoinAndSelect('pt.products', 'p')
      .where('pt.id = :id', { id })
      .getOne();

    const items = master ? master.products : [];

    return items.map(item => ({ ...item, productType: master.id }));
  }

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */
}
