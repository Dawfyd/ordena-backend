import * as fs from 'fs';
import * as path from 'path';
import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

import appConfig from '../../config/app.config';

import { createFileFromReadStream } from '../../utils';

import { Product } from './entities/product.entity';
import { ParametersService } from '../parameters/parameters.service';
import { ProductTypesService } from '../product-types/product-types.service';
import { ProductsInVenueService } from '../products-in-venue/products-in-venue.service';
import { VenuesService } from '../venues/venues.service';
import { CategoriesService } from '../categories/categories.service';

import { CreateProductInput } from './dto/create-product.input.dto';
import { FindAllProductInput } from './dto/find-all-product-input.dto';
import { FindOneProductInput } from './dto/find-one-product-input.dto';
import { UpdateProductInput } from './dto/update-product.input.dto';
import { GetByIdInput } from './dto/get-by-id-input.dto';
import { CreateProductPureInput } from './dto/create-product-pure-input.dto';
import { UpdateCategoryPureProductInput } from './dto/update-category-pure-product-input.dto';

@Injectable()
export class ProductsService {
  constructor (
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly productTypesService: ProductTypesService,
    private readonly parametersService: ParametersService,
    private readonly venuesService: VenuesService,
    @Inject(forwardRef(() => ProductsInVenueService))
    private readonly productsInVenueService: ProductsInVenueService,
    private readonly categoriesService: CategoriesService
  ) {}

  public async createMenuProduct (createProductInput: CreateProductInput): Promise<Product> {
    const { companyUuid, venueId } = createProductInput;

    const venue = await this.venuesService.findOne({ companyUuid, id: venueId });

    if (!venue) {
      throw new NotFoundException(`can't get the venue ${venueId} for the company ${companyUuid}.`);
    }

    const productTypeMenu = await this.parametersService.findOneName('PRODUCT_TYPE_MENUS');

    if (!productTypeMenu) {
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_MENUS".');
    }

    const productType = await this.productTypesService.findOneCode({ code: productTypeMenu.value });

    const newProduct = this.productRepository.create({
      ...createProductInput,
      canBeAditional: true,
      productType
    });

    const product = await this.productRepository.save(newProduct);

    await this.productsInVenueService.create({
      companyUuid,
      venueId: venue.id,
      productId: product.id
    });

    return product;
  }

  public async createCategoryProduct (createProductInput: CreateProductInput): Promise<Product> {
    const { companyUuid, venueId } = createProductInput;

    const venue = await this.venuesService.findOne({ companyUuid, id: venueId });

    if (!venue) {
      throw new NotFoundException(`can't get the venue ${venueId} for the company ${companyUuid}.`);
    }

    const productTypeCategory = await this.parametersService.findOneName('PRODUCT_TYPE_ASSIGNED_CATEGORIES');

    if (!productTypeCategory) {
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_ASSIGNED_CATEGORIES".');
    }

    const productType = await this.productTypesService.findOneCode({ code: productTypeCategory.value });

    const newProduct = this.productRepository.create({
      ...createProductInput,
      canBeAditional: true,
      productType
    });

    const product = await this.productRepository.save(newProduct);

    await this.productsInVenueService.create({
      companyUuid,
      venueId: venue.id,
      productId: product.id
    });

    return product;
  }

  public async createPureProduct (createProductPureInput: CreateProductPureInput): Promise<Product> {
    const { companyUuid, venueId, categoryId } = createProductPureInput;

    const venue = await this.venuesService.findOne({ companyUuid, id: venueId });

    if (!venue) {
      throw new NotFoundException(`can't get the venue ${venueId} for the company ${companyUuid}.`);
    }

    const category = await this.categoriesService.findOne({ companyUuid, id: categoryId });

    if (!category) {
      throw new NotFoundException(`can't get the category ${categoryId} for the company ${companyUuid}.`);
    }

    const productTypePure = await this.parametersService.findOneName('PRODUCT_TYPE_PURE');

    if (!productTypePure) {
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_PURE".');
    }

    const productType = await this.productTypesService.findOneCode({ code: productTypePure.value });

    const newProduct = this.productRepository.create({
      ...createProductPureInput,
      canBeAditional: false,
      productType,
      category
    });

    const product = await this.productRepository.save(newProduct);

    await this.productsInVenueService.create({
      companyUuid,
      venueId: venue.id,
      productId: product.id
    });

    return product;
  }

  public async createProductAssignedProduct (createProductInput: CreateProductInput): Promise<Product> {
    const { companyUuid, venueId } = createProductInput;

    const venue = await this.venuesService.findOne({ companyUuid, id: venueId });

    if (!venue) {
      throw new NotFoundException(`can't get the venue ${venueId} for the company ${companyUuid}.`);
    }

    const productTypeProduct = await this.parametersService.findOneName('PRODUCT_TYPE_ASSIGNED_PRODUCTS');

    if (!productTypeProduct) {
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_ASSIGNED_PRODUCTS".');
    }

    const productType = await this.productTypesService.findOneCode({ code: productTypeProduct.value });

    const newProduct = this.productRepository.create({
      ...createProductInput,
      canBeAditional: true,
      productType
    });

    const product = await this.productRepository.save(newProduct);

    await this.productsInVenueService.create({
      companyUuid,
      venueId: venue.id,
      productId: product.id
    });

    return product;
  }

  public async findAll (findAllProductInput: FindAllProductInput): Promise<Product[]> {
    const { companyUuid, limit, skip, search } = findAllProductInput;

    const query = this.productRepository.createQueryBuilder('p')
      .loadAllRelationIds()
      .innerJoin('p.productsInVenues', 'pv')
      .innerJoin('pv.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    if (search) {
      query.andWhere('p.name ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('p.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  public async findOne (findOneProductInput: FindOneProductInput): Promise<Product> {
    const { companyUuid, id } = findOneProductInput;

    const item = await this.productRepository.createQueryBuilder('p')
      .loadAllRelationIds()
      .innerJoin('p.productsInVenues', 'pv')
      .innerJoin('pv.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('p.id = :id', { id })
      .getOne();

    return item || null;
  }

  public async update (findOneProductInput: FindOneProductInput, updateProductInput: UpdateProductInput): Promise<Product> {
    const { companyUuid, id } = findOneProductInput;

    const existing = await this.findOne(findOneProductInput);

    if (!existing) {
      throw new NotFoundException(`can't get the product ${id} for the company with uuid ${companyUuid}.`);
    }

    const preloaded = await this.productRepository.preload({
      id: existing.id,
      ...updateProductInput
    });

    const saved = await this.productRepository.save(preloaded);

    return saved;
  }

  public async updateCategoryPureProduct (findOneProductInput: FindOneProductInput, updateCategoryPureProductInput: UpdateCategoryPureProductInput): Promise<Product> {
    const productTypePure = await this.parametersService.findOneName('PRODUCT_TYPE_PURE');

    if (!productTypePure) {
      throw new PreconditionFailedException('The parameter to identify the code of the product type must exist and be configured correctly "PRODUCT_TYPE_PURE".');
    }

    const { companyUuid, id } = findOneProductInput;

    const existing = await this.findOne(findOneProductInput);

    if (!existing) {
      throw new NotFoundException(`can't get the product ${id} for the company with uuid ${companyUuid}.`);
    }

    const productType = await this.productTypesService.findOne({ id: +existing.productType });

    if (productTypePure.value !== productType.code) {
      throw new PreconditionFailedException('can only update the category to a pure product.');
    }

    const { categoryId } = updateCategoryPureProductInput;

    const category = await this.categoriesService.findOne({ companyUuid, id: categoryId });

    if (!category) {
      throw new NotFoundException(`can't get the category ${categoryId} for the company ${companyUuid}.`);
    }

    const preloaded = await this.productRepository.preload({
      id: existing.id,
      category
    });

    const saved = await this.productRepository.save(preloaded);

    return saved;
  }

  public async remove (findOneProductInput: FindOneProductInput): Promise<Product> {
    const { companyUuid, id } = findOneProductInput;

    const existing = await this.findOne(findOneProductInput);

    if (!existing) {
      throw new NotFoundException(`can't get the product ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.productRepository.remove(existing);

    return clone;
  }

  public async getById (getByIdInput: GetByIdInput): Promise<Product | null> {
    const { id } = getByIdInput;

    const existing = await this.productRepository.findOne(id);

    return existing || null;
  }

  /* CRUD RELATED OPERATIONS */

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  public async getByIds (ids: number[]): Promise<Product[]> {
    return this.productRepository.findByIds(ids, {
      loadRelationIds: true
    });
  }

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */

  public async favorites (product: Product): Promise<any[]> {
    const { id } = product;

    const master = await this.productRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.favorites', 'f')
      .where('p.id = :id', { id })
      .getOne();

    const items = master ? master.favorites : [];

    return items.map(item => ({ ...item, product: master.id }));
  }

  public async assignedCategories (product: Product): Promise<any[]> {
    const { id } = product;

    const master = await this.productRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.assignedCategories', 'ac')
      .where('p.id = :id', { id })
      .getOne();

    const items = master ? master.assignedCategories : [];

    return items.map(item => ({ ...item, product: master.id }));
  }

  public async prices (product: Product): Promise<any[]> {
    const { id } = product;

    const master = await this.productRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.prices', 'pr')
      .where('p.id = :id', { id })
      .getOne();

    const items = master ? master.prices : [];

    return items.map(item => ({ ...item, product: master.id }));
  }

  public async modifiers (product: Product): Promise<any[]> {
    const { id } = product;

    const master = await this.productRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.modifiers', 'm')
      .where('p.id = :id', { id })
      .getOne();

    const items = master ? master.modifiers : [];

    return items.map(item => ({ ...item, product: master.id }));
  }

  public async parentProducts (product: Product): Promise<any[]> {
    const { id } = product;

    const master = await this.productRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.parentProducts', 'pp')
      .where('p.id = :id', { id })
      .getOne();

    const items = master ? master.parentProducts : [];

    return items.map(item => ({ ...item, product: master.id }));
  }

  public async assignedProducts (product: Product): Promise<any[]> {
    const { id } = product;

    const master = await this.productRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.assignedProducts', 'ap')
      .where('p.id = :id', { id })
      .getOne();

    const items = master ? master.assignedProducts : [];

    return items.map(item => ({ ...item, product: master.id }));
  }

  public async requests (product: Product): Promise<any[]> {
    const { id } = product;

    const master = await this.productRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.requests', 'r')
      .where('p.id = :id', { id })
      .getOne();

    const items = master ? master.requests : [];

    return items.map(item => ({ ...item, product: master.id }));
  }

  public async additionalsPerRequest (product: Product): Promise<any[]> {
    const { id } = product;

    const master = await this.productRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.additionalsPerRequests', 'apr')
      .where('p.id = :id', { id })
      .getOne();

    const items = master ? master.additionalsPerRequests : [];

    return items.map(item => ({ ...item, product: master.id }));
  }

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */

  public async uploadImage (
    findOneProductInput: FindOneProductInput,
    fileUpload: any
  ): Promise<Product> {
    const existing = await this.findOne(findOneProductInput);

    if (!existing) {
      throw new NotFoundException(`can't get the product ${findOneProductInput.id} for the company with uuid ${findOneProductInput.companyUuid}.`);
    }

    let filePath = '';

    try {
      const { filename, mimetype } = fileUpload;

      if (!mimetype.startsWith('image')) {
        throw new BadRequestException('mimetype not allowed.');
      }

      const basePath = path.resolve(__dirname);

      const fileExt = filename.split('.').pop();

      filePath = `${basePath}/${existing.id}.${fileExt}`;

      const { createReadStream } = fileUpload;

      const stream = createReadStream();

      await createFileFromReadStream(stream, filePath);

      let cloudinaryResponse;

      try {
        const folderName = this.appConfiguration.environment === 'production'
          ? 'products'
          : `${this.appConfiguration.environment}_products`;

        cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
          folder: folderName,
          public_id: '' + existing.id,
          use_filename: true,
          eager: [
            { width: 300, height: 300 }
          ]
        });
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }

      const { public_id: publicId, eager } = cloudinaryResponse;

      const eagerItem = eager[0];

      const preloaded = await this.productRepository.preload({
        id: existing.id,
        cloudId: publicId,
        url: eagerItem.secure_url
      });

      const saved = await this.productRepository.save(preloaded);

      return saved;
    } finally {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }
}
