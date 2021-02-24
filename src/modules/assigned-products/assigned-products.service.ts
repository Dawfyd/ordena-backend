import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ParametersService } from '../parameters/parameters.service';
import { ProductTypesService } from '../product-types/product-types.service';
import { ProductsService } from '../products/products.service';

import { AssignedProduct } from './entities/assigned-product.entity';

import { CreateAssignedProductInput } from './dto/create-assigned-product-input.dto';
import { FindAllAssignedProductInput } from './dto/find-all-assigned-product-input.dto';
import { FindOneAssignedProductInput } from './dto/find-one-assigned-product-input.dto';
import { UpdateAssignedProductInput } from './dto/update-assigned-product-input.dto';

@Injectable()
export class AssignedProductsService {
  constructor (
    @InjectRepository(AssignedProduct)
    private readonly assignedProductRepository: Repository<AssignedProduct>,
    private readonly productsService: ProductsService,
    private readonly parametersService: ParametersService,
    private readonly productTypesService: ProductTypesService
  ) {}

  async assingProductToProduct (createAssignedProductInput: CreateAssignedProductInput): Promise<AssignedProduct> {
    // Se valida parametros
    const productTypeParent = await this.parametersService.findOneName('PRODUCT_TYPE_PURE');

    if (!productTypeParent) {
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_PURE".');
    }

    const productTypeAssigned = await this.parametersService.findOneName('PRODUCT_TYPE_ASSIGNED_PRODUCTS');

    if (!productTypeAssigned) {
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_ASSIGNED_PRODUCTS".');
    }

    const { companyUuid, parentId, assignedId } = createAssignedProductInput;

    // Se valida productos
    const parent = await this.productsService.findOne({ companyUuid, id: parentId });

    if (!parent) {
      throw new NotFoundException(`can't get the pure product ${parentId} for the company ${companyUuid}.`);
    }

    const assigned = await this.productsService.findOne({ companyUuid, id: assignedId });

    if (!assigned) {
      throw new NotFoundException(`can't get the additional product ${assignedId} for the company ${companyUuid}.`);
    }

    let productType = await this.productTypesService.findOne({ id: +parent.productType });

    // Se valida tipo de producto
    if (productTypeParent.value !== productType.code) {
      throw new PreconditionFailedException(`Para parentId solo se pueden asignar productos de tipo ${productTypeParent.value}`);
    }

    productType = await this.productTypesService.findOne({ id: +assigned.productType });

    if (productTypeAssigned.value !== productType.code) {
      throw new PreconditionFailedException(`Para assignedId solo se pueden asignar productos de tipo ${productTypeAssigned.value}`);
    }

    const created = this.assignedProductRepository.create({
      parent,
      assigned
    });

    const saved = await this.assignedProductRepository.save(created);

    return saved;
  }

  async findAll (findAllAssignedProductInput: FindAllAssignedProductInput): Promise<AssignedProduct[]> {
    const { companyUuid, limit, skip } = findAllAssignedProductInput;

    const query = this.assignedProductRepository.createQueryBuilder('ap')
      .loadAllRelationIds()
      .innerJoin('ap.parent', 'p')
      .innerJoin('p.productsInVenues', 'pv')
      .innerJoin('pv.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('ap.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  async findOne (findOneAssignedProductInput: FindOneAssignedProductInput): Promise<AssignedProduct> {
    const { companyUuid, id } = findOneAssignedProductInput;

    const item = await this.assignedProductRepository.createQueryBuilder('ap')
      .loadAllRelationIds()
      .innerJoin('ap.parent', 'p')
      .innerJoin('p.productsInVenues', 'pv')
      .innerJoin('pv.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('ap.id = :id', { id })
      .getOne();

    return item || null;
  }

  async update (findOneAssignedProductInput: FindOneAssignedProductInput, updateAssignedProductInput: UpdateAssignedProductInput): Promise<AssignedProduct> {
    const { companyUuid, id } = findOneAssignedProductInput;

    const existing = await this.findOne(findOneAssignedProductInput);

    if (!existing) {
      throw new NotFoundException(`can't get the product assigned ${id} for the company with uuid ${companyUuid}.`);
    }

    const { parentId } = updateAssignedProductInput;

    let parent;

    if (parentId) {
      const productTypeParent = await this.parametersService.findOneName('PRODUCT_TYPE_PURE');

      if (!productTypeParent) {
        throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_PURE".');
      }

      parent = await this.productsService.findOne({ companyUuid, id: parentId });

      if (!parent) {
        throw new NotFoundException(`can't get the pure product ${parentId} for the company ${companyUuid}.`);
      }

      const productType = await this.productTypesService.findOne({ id: +parent.productType });

      if (productTypeParent.value !== productType.code) {
        throw new PreconditionFailedException(`Para parentId solo se pueden asignar productos de tipo ${productTypeParent.value}`);
      }
    }

    const { assignedId } = updateAssignedProductInput;

    let assigned;

    if (assignedId) {
      const productTypeAssigned = await this.parametersService.findOneName('PRODUCT_TYPE_ASSIGNED_PRODUCTS');

      if (!productTypeAssigned) {
        throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_ASSIGNED_PRODUCTS".');
      }

      assigned = await this.productsService.findOne({ companyUuid, id: assignedId });

      if (!assigned) {
        throw new NotFoundException(`can't get the additional product ${assignedId} for the company ${companyUuid}.`);
      }

      const productType = await this.productTypesService.findOne({ id: +assigned.productType });

      if (productTypeAssigned.value !== productType.code) {
        throw new PreconditionFailedException(`Para assignedId solo se pueden asignar productos de tipo ${productTypeAssigned.value}`);
      }
    }

    const preloaded = await this.assignedProductRepository.preload({
      id: existing.id,
      ...updateAssignedProductInput,
      parent,
      assigned
    });

    const saved = await this.assignedProductRepository.save(preloaded);

    return saved;
  }

  async remove (findOneAssignedProductInput: FindOneAssignedProductInput): Promise<AssignedProduct> {
    const { companyUuid, id } = findOneAssignedProductInput;

    const existing = await this.findOne(findOneAssignedProductInput);

    if (!existing) {
      throw new NotFoundException(`can't get the product assigned ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.assignedProductRepository.remove(existing);

    return clone;
  }
}
