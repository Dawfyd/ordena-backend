import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from '../customers/customers.service';
import { CreateVenueInput } from './dto/create-venue.input';
import { UpdateVenueInput } from './dto/update-venue.input';
import { Venue } from './entities/venue.entity';


@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue)
    private readonly VenueRepository: Repository<Venue>,
    private readonly  customersService: CustomersService
  ) {}

  async create(
    createVenueInput: CreateVenueInput,
  ): Promise<Venue> {
    const { id_customer } = createVenueInput

    const customer = await this.customersService.findOne(id_customer);

    delete createVenueInput.id_customer;

    const newVenue = this.VenueRepository.create({
      ...createVenueInput,
      customer
    });

    return await this.VenueRepository.save(newVenue);
  }

  async findAll(): Promise<Venue[]> {
    return await this.VenueRepository.find();
  }

  async findOne(id: number): Promise<Venue> {
    const venue = await this.VenueRepository.findOne(id);
    if (!venue)
      throw new NotFoundException('No hay una sede con esa ID');
    return venue;
  }

  async update(id: number, updateVenueInput: UpdateVenueInput): Promise<Venue> {
    const venue = await this.findOne(id);

    const { id_customer } = updateVenueInput;

    const customer = await this.customersService.findOne(id_customer);
    delete updateVenueInput.id_customer;
    const editedVenue = this.VenueRepository.merge(venue,{
      ...updateVenueInput,
      customer
    });

    return await this.VenueRepository.save(editedVenue);
  }

  async remove(id: number): Promise<Venue> {
    const venue = await this.findOne(id);
    return await this.VenueRepository.remove(venue);
  }
}
