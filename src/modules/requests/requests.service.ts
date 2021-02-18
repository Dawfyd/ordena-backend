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
import { FindOneRequestStatusInput } from '../request-statuses/dto/find-one-request-status.input.dto';
import { FindOneRequestInput } from './dto/find-one-request.input.dto';

@Injectable()
export class RequestsService {
  constructor (
    @InjectRepository(Request)
    private readonly RequestRepository: Repository<Request>,
    private readonly productsService: ProductsService,
    private readonly spotsService: SpotsService,
    private readonly ordersService: OrdersService,
    private readonly requestStatusesService: RequestStatusesService
  ) {}

  async create (createRequestInput: CreateRequestInput): Promise<Request> {
    const { product_id, order_id, spot_id, request_status_id } = createRequestInput;

    const product = await this.productsService.findOne(product_id);
    const order = await this.ordersService.findOne({ id: order_id });
    const spot = await this.spotsService.findOne(spot_id);
    const requestStatus = await this.requestStatusesService.findOne(request_status_id as any);

    if (!requestStatus) {
      throw new NotFoundException(`can't get the requestStatus with id ${request_status_id}.`);
    }

    const created = this.RequestRepository.create(
      { ...createRequestInput, product, order, spot, requestStatus }
    );
    const saved = await this.RequestRepository.save(created)
    return saved;
  }

  async findAll (findAllRequestsInput: FindAllRequestsInput): Promise<Request[]> {
    const { limit, skip, search= ''} = findAllRequestsInput;

    const query = this.RequestRepository.createQueryBuilder('r')
    .loadAllRelationIds();

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

  async findOne (findOneRequestInput: FindOneRequestStatusInput): Promise<Request | null> {
    const { id } = findOneRequestInput;

    const item = this.RequestRepository.createQueryBuilder('r')
    .loadAllRelationIds()
      .innerJoin('r.requestStatus', 'rs')
      .where('rq.id = :id', { id })
      .andWhere('r.id = :id', { id })
      .getOne();

      return item || null;
  }

  async findOrderRequest (order: number): Promise<Request[]> {
    return await this.RequestRepository.find({
      where: {
        order
      }
    });
  }

  async findSpotRequest (spot: number): Promise<Request[]> {
    return await this.RequestRepository.find({
      where: {
        spot
      }
    });
  }

  async findRequestStatusRequest (requestStatus: number): Promise<Request[]> {
    return await this.RequestRepository.find({
      where: {
        requestStatus
      }
    });
  }

  async update (findOneRequestInput: FindOneRequestInput, updateRequestInput: UpdateRequestInput): Promise<Request> {
    const existing = await this.findOne(findOneRequestInput);

    const { id } = findOneRequestInput;
    const { product_id, order_id, spot_id, request_status_id } = updateRequestInput;

    const product = await this.productsService.findOne(product_id);
    const order = await this.ordersService.findOne({id: order_id});
    const spot = await this.spotsService.findOne(spot_id);
    const requestStatus = await this.requestStatusesService.findOne(request_status_id as any);

    if (!existing) {
      throw new NotFoundException(`can't get the request with id ${id}.`);
    }

    if (!requestStatus) {
      throw new NotFoundException(`can't get the requestStatuses with id ${request_status_id}.`);
    }

    const preloaded = await this.RequestRepository.preload({
      id: existing.id,
      ...updateRequestInput, product, order, spot
    })

    const saved = await this.RequestRepository.save(preloaded)
    return saved;
  }

  async remove (findOneRequestInput: FindOneRequestInput) {
    const { id } = findOneRequestInput;
    const existing = await this.findOne(findOneRequestInput);

    if (!existing) {
      throw new NotFoundException(`can't get the request with ${id} .`);
    }

    const clone = { ...existing };

    await this.RequestRepository.remove(existing);

    return clone;
  }
}
