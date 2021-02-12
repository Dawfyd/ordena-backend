import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { RequestsService } from '../requests/requests.service';
import { CreateAdditionalsPerRequestInput } from './dto/create-additionals-per-request.input';
import { UpdateAdditionalsPerRequestInput } from './dto/update-additionals-per-request.input';
import { AdditionalsPerRequest } from './entities/additionals-per-request.entity';

@Injectable()
export class AdditionalsPerRequestsService {
  constructor (
    @InjectRepository(AdditionalsPerRequest)
    private readonly AdditionalsPerRequestRepository: Repository<AdditionalsPerRequest>,
    private readonly productsService: ProductsService,
    private readonly requestsService: RequestsService

  ) {}

  async create (createAdditionalsPerRequestInput: CreateAdditionalsPerRequestInput) {
    const { product_id, request_id } = createAdditionalsPerRequestInput;

    const product = await this.productsService.findOne(product_id);
    const request = await this.requestsService.findOne(request_id);

    const newAdditionalsPerRequest = this.AdditionalsPerRequestRepository.create({ product, request });
    return await this.AdditionalsPerRequestRepository.save(newAdditionalsPerRequest);
  }

  async findAll () {
    return await this.AdditionalsPerRequestRepository.find();
  }

  async findOne (id: number) {
    const additionalsPerRequest = await this.AdditionalsPerRequestRepository.findOne(id);
    if (!additionalsPerRequest) throw new NotFoundException('No hay un solicitud por adicional con esa ID');
    return additionalsPerRequest;
  }

  async update (id: number, updateAdditionalsPerRequestInput: UpdateAdditionalsPerRequestInput) {
    const additionalsPerRequest = await this.findOne(id);

    const { product_id, request_id } = updateAdditionalsPerRequestInput;

    const product = await this.productsService.findOne(product_id);
    const request = await this.requestsService.findOne(request_id);

    const editedadditionalsPerRequest = this.AdditionalsPerRequestRepository.merge(additionalsPerRequest, {
      product,
      request
    });

    return await this.AdditionalsPerRequestRepository.save(editedadditionalsPerRequest);
  }

  async remove (id: number) {
    const additionalsPerRequest = await this.findOne(id);
    return await this.AdditionalsPerRequestRepository.remove(additionalsPerRequest);
  }
}
