import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Request } from './entities/request.entity';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { RequestStatusesService } from '../request-statuses/request-statuses.service';
import { SpotsService } from '../spots/spots.service';

import { CreateRequestInput } from './dto/create-request.input.dto';
import { UpdateRequestInput } from './dto/update-request.input.dto';
import { FindAllRequestsInput } from './dto/find-all-request.input.dto';
import { FindOneRequestInput } from './dto/find-one-request.input.dto';

@Injectable()
export class RequestsService {
  constructor (
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
    private readonly productsService: ProductsService,
    private readonly spotsService: SpotsService,
    private readonly ordersService: OrdersService,
    private readonly requestStatusesService: RequestStatusesService
  ) {}

  public async create (createRequestInput: CreateRequestInput): Promise<Request> {
    const { productId, orderId, spotId, requestStatusId, companyUuid } = createRequestInput;

    const product = await this.productsService.findOne({ id: productId, companyUuid });
    if (!product) {
      throw new NotFoundException(`can't get the product ${productId} for the company with uuid ${companyUuid}.`);
    }

    const order = await this.ordersService.findOne({ id: orderId, companyUuid });
    if (!order) {
      throw new NotFoundException(`can't get the order ${orderId} for the company with uuid ${companyUuid}.`);
    }

    const spot = await this.spotsService.findOne({ id: spotId, companyUuid });
    if (!spot) {
      throw new NotFoundException(`can't get the spot ${spotId} for the company with uuid ${companyUuid}.`);
    }

    const requestStatus = await this.requestStatusesService.findOne({ id: requestStatusId });
    if (!requestStatus) {
      throw new NotFoundException(`can't get the requestStatus with id ${requestStatusId}.`);
    }

    const created = this.requestRepository.create(
      { ...createRequestInput, product, order, spot, requestStatus }
    );
    const saved = await this.requestRepository.save(created);
    return saved;
  }

  public async findAll (findAllRequestsInput: FindAllRequestsInput): Promise<Request[]> {
    const { companyUuid, limit, skip, search = '' } = findAllRequestsInput;

    const query = this.requestRepository.createQueryBuilder('r')
      .loadAllRelationIds()
      .innerJoin('r.spot', 's')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    if (search) {
      query.where('r.addition ilike :search', { search: `%${search}%` })
        .orWhere('r.modifier ilike :search', { search: `%${search}%` });
    }

    const items = await query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('r.id', 'DESC')
      .getMany();

    return items;
  }

  public async findOne (findOneRequestInput: FindOneRequestInput): Promise<Request | null> {
    const { id, companyUuid } = findOneRequestInput;

    const item = this.requestRepository.createQueryBuilder('r')
      .loadAllRelationIds()
      .innerJoin('r.spot', 's')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('r.id = :id', { id })
      .getOne();

    return item || null;
  }

  public async update (findOneRequestInput: FindOneRequestInput, updateRequestInput: UpdateRequestInput): Promise<Request> {
    const { id, companyUuid } = findOneRequestInput;
    const existing = await this.findOne(findOneRequestInput);

    if (!existing) {
      throw new NotFoundException(`can't get the request with id ${id}.`);
    }

    const { productId, orderId, spotId, requestStatusId } = updateRequestInput;

    let product;
    if (productId) {
      product = await this.productsService.findOne({ id: productId, companyUuid });

      if (!product) {
        throw new NotFoundException(`can't get the product ${productId} for the company with uuid ${companyUuid}.`);
      }
    }

    let order;
    if (orderId) {
      order = await this.ordersService.findOne({ id: orderId, companyUuid });

      if (!order) {
        throw new NotFoundException(`can't get the spot ${orderId} for the company with uuid ${companyUuid}.`);
      }
    }

    let spot;
    if (spotId) {
      spot = await this.spotsService.findOne({ id: spotId, companyUuid });

      if (!spot) {
        throw new NotFoundException(`can't get the spot ${spotId} for the company with uuid ${companyUuid}.`);
      }
    }

    let requestStatus;
    if (requestStatusId) {
      requestStatus = await this.requestStatusesService.findOne({ id: requestStatusId });

      if (!requestStatus) {
        throw new NotFoundException(`can't get the requestStatus with id ${requestStatusId}.`);
      }
    }

    const preloaded = await this.requestRepository.preload({
      id: existing.id,
      ...updateRequestInput,
      product,
      order,
      spot
    });

    const saved = await this.requestRepository.save(preloaded);
    return saved;
  }

  public async remove (findOneRequestInput: FindOneRequestInput): Promise<Request> {
    const { id, companyUuid } = findOneRequestInput;
    const existing = await this.findOne(findOneRequestInput);

    if (!existing) {
      throw new NotFoundException(`can't get the request with ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.requestRepository.remove(existing);

    return clone;
  }

  public async getByIds (ids: number[]): Promise<Request[]> {
    return this.requestRepository.findByIds(ids, {
      loadRelationIds: true
    });
  }

  public async modifiersPerRequests (request: Request): Promise<any[]> {
    const { id } = request;

    const master = await this.requestRepository.createQueryBuilder('r')
      .leftJoinAndSelect('r.modifiersPerRequests', 'mpr')
      .where('mpr.id = :id', { id })
      .getOne();

    const items = master ? master.modifiersPerRequests : [];

    return items.map(item => ({ ...item, modifiersPerRequests: master.id }));
  }
}
