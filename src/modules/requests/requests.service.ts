import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { RequestStatusesService } from '../request-statuses/request-statuses.service';
import { SpotsService } from '../spots/spots.service';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { Request } from './entities/request.entity';

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
    // TODO: fix
    const product = {};
    const order = await this.ordersService.findOne(order_id);
    // FIXME:
    const spot = {};
    const requestStatus = await this.requestStatusesService.findOne(request_status_id);

    const newRequest = this.RequestRepository.create(
      { ...createRequestInput, product, order, spot, requestStatus }
    );
    return await this.RequestRepository.save(newRequest);
  }

  async findAll (): Promise<Request[]> {
    return await this.RequestRepository.find();
  }

  async findOne (id: number): Promise<Request> {
    const request = await this.RequestRepository.findOne(id);
    if (!request) { throw new NotFoundException('No hay un producto ordenado con esa ID'); }
    return request;
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

  async update (id: number, updateRequestInput: UpdateRequestInput) {
    const request = await this.findOne(id);

    const { product_id, order_id, spot_id, request_status_id } = updateRequestInput;

    // FIXME:
    const product = {};
    const order = await this.ordersService.findOne(order_id);
    // FIXME:
    const spot = {};
    const requestStatus = await this.requestStatusesService.findOne(request_status_id);

    const editedRequest = this.RequestRepository.merge(
      request,
      { ...updateRequestInput, product, order, spot, requestStatus }
    );
    return await this.RequestRepository.save(editedRequest);
  }

  async remove (id: number) {
    const request = await this.findOne(id);
    return await this.RequestRepository.remove(request);
  }
}
