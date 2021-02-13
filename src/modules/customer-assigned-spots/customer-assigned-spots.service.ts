import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonsService } from '../persons/persons.service';
import { SpotsService } from '../spots/spots.service';
import { CreateCustomerAssignedSpotInput } from './dto/create-customer-assigned-spot.input';
import { UpdateCustomerAssignedSpotInput } from './dto/update-customer-assigned-spot.input';
import { CustomerAssignedSpot } from './entities/customer-assigned-spot.entity';

@Injectable()
export class CustomerAssignedSpotsService {
  constructor (
    @InjectRepository(CustomerAssignedSpot)
    private readonly CustomerAssignedSpotRepository: Repository<CustomerAssignedSpot>,
    private readonly personsService: PersonsService,
    private readonly spotsService: SpotsService
  ) {}

  async create (createCustomerAssignedSpotInput: CreateCustomerAssignedSpotInput): Promise<CustomerAssignedSpot> {
    const { person_id, spot_id } = createCustomerAssignedSpotInput;

    // TODO: fix this
    const person = {};
    const spot = await this.spotsService.findOne(spot_id);

    const newCustomerAssignedSpot = this.CustomerAssignedSpotRepository.create({ person, spot, ...createCustomerAssignedSpotInput });
    return await this.CustomerAssignedSpotRepository.save(newCustomerAssignedSpot);
  }

  async findAll (): Promise<CustomerAssignedSpot[]> {
    return await this.CustomerAssignedSpotRepository.find();
  }

  async findOne (id: number): Promise<CustomerAssignedSpot> {
    const customerAssignedSpot = await this.CustomerAssignedSpotRepository.findOne(id);
    if (!customerAssignedSpot) throw new NotFoundException('no hay ninguna registro con este id');
    return customerAssignedSpot;
  }

  async findPersonCustomerAssignedPost (person: number): Promise<CustomerAssignedSpot[]> {
    return await this.CustomerAssignedSpotRepository.find({
      where: {
        person
      }
    });
  }

  async findSpotCustomerAssignedPost (spot: number): Promise<CustomerAssignedSpot[]> {
    return await this.CustomerAssignedSpotRepository.find({
      where: {
        spot
      }
    });
  }

  async update (id: number, updateCustomerAssignedSpotInput: UpdateCustomerAssignedSpotInput): Promise<CustomerAssignedSpot> {
    const customerAssignedSpot = await this.findOne(id);
    const { person_id, spot_id } = updateCustomerAssignedSpotInput;

    // TODO: fix this
    const person = {};
    const spot = await this.spotsService.findOne(spot_id);

    const editedCustomerAssignedSpot = this.CustomerAssignedSpotRepository.merge(customerAssignedSpot, { person, spot, ...updateCustomerAssignedSpotInput });

    return await this.CustomerAssignedSpotRepository.save(editedCustomerAssignedSpot);
  }

  async remove (id: number): Promise<CustomerAssignedSpot> {
    const customerAssignedSpot = await this.findOne(id);
    return await this.CustomerAssignedSpotRepository.remove(customerAssignedSpot);
  }
}
