import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from '../products/products.service';
import { RequestsService } from '../requests/requests.service';
import { AdditionalsPerRequest } from './entities/additionals-per-request.entity';

import { CreateAdditionalsPerRequestInput } from './dto/create-additionals-per-request.input.dto';
import { FindAllAdditionalsPerRequestInput } from './dto/find-all-additionals-per-request.inputs.dto';
import { FindOneAdditionalsPerRequestInput } from './dto/find-one-additionals-per-request.input.dto';
import { UpdateAdditionalsPerRequestInput } from './dto/update-additionals-per-request.input.dto';

@Injectable()
export class AdditionalsPerRequestsService {
  constructor (
    @InjectRepository(AdditionalsPerRequest)
    private readonly additionalsPerRequestRepository: Repository<AdditionalsPerRequest>,
    private readonly productsService: ProductsService,
    private readonly requestsService: RequestsService
  ) {}

  public async create (createAdditionalsPerRequestInput: CreateAdditionalsPerRequestInput): Promise<AdditionalsPerRequest> {
    const { productId, requestId, companyUuid } = createAdditionalsPerRequestInput;

    const product = await this.productsService.findOne({ id: productId, companyUuid });
    if (!product) {
      throw new NotFoundException(`can't get product with id ${productId} for the company with uuid ${companyUuid}.`);
    }

    const request = await this.requestsService.findOne({ id: requestId, companyUuid });
    if (!request) {
      throw new NotFoundException(`can't get product with id ${requestId}`);
    }

    const created = this.additionalsPerRequestRepository.create({ product, request });
    const saved = await this.additionalsPerRequestRepository.save(created);

    return saved;
  }

  public async findAll (findAllAdditionalPerRequest: FindAllAdditionalsPerRequestInput): Promise<AdditionalsPerRequest[]> {
    const { companyUuid, limit, skip } = findAllAdditionalPerRequest;

    const query = this.additionalsPerRequestRepository.createQueryBuilder('apr')
      .loadAllRelationIds()
      .innerJoin('apr.product', 'p')
      .innerJoin('apr.request', 'r')
      .innerJoin('r.spot', 's')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('apr.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  public async findOne (findOneAdditionalsPerRequestinput: FindOneAdditionalsPerRequestInput): Promise<AdditionalsPerRequest | null> {
    const { id, companyUuid } = findOneAdditionalsPerRequestinput;

    const item = this.additionalsPerRequestRepository.createQueryBuilder('apr')
      .loadAllRelationIds()
      .innerJoin('apr.produt', 'p')
      .innerJoin('apr.request', 'r')
      .innerJoin('r.spot', 's')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('apr.id = :id', { id })
      .getOne();

    return item || null;
  }

  public async update (findOneAdditionalsPerRequestinput: FindOneAdditionalsPerRequestInput, updateAdditionalsPerRequestInput: UpdateAdditionalsPerRequestInput): Promise<AdditionalsPerRequest> {
    const { productId, requestId } = updateAdditionalsPerRequestInput;
    const { id, companyUuid } = findOneAdditionalsPerRequestinput;

    const existing = await this.findOne({ id, companyUuid });
    if (!existing) throw new NotFoundException(`can't get additionalPerRequest with id ${id} for the companu with uuid ${companyUuid}`);

    let product;
    if (productId) {
      product = await this.productsService.findOne({ id: productId, companyUuid });

      if (!product) {
        throw new NotFoundException(`can't get product with id ${productId} for the company with uuid ${companyUuid}`);
      }
    }

    let request;
    if (requestId) {
      request = await this.requestsService.findOne({ id: requestId, companyUuid });

      if (!request) {
        throw new NotFoundException(`can't get product with id ${requestId} for the company with uuid ${companyUuid}`);
      }
    }

    const preloaded = await this.additionalsPerRequestRepository.preload({
      id: existing.id,
      request,
      product
    });

    const saved = await this.additionalsPerRequestRepository.save(preloaded);

    return saved;
  }

  async remove (findOneAdditionalsPerRequestinput: FindOneAdditionalsPerRequestInput): Promise<AdditionalsPerRequest> {
    const { id, companyUuid } = findOneAdditionalsPerRequestinput;

    const existing = await this.findOne({ id, companyUuid });
    if (!existing) {
      throw new NotFoundException(`can't get additionalPerRequest with id ${id} for the company with uuid ${companyUuid}`);
    }

    const clone = { ...existing };

    await this.additionalsPerRequestRepository.remove(existing);

    return clone;
  }
}
