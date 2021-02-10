import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';
import { CreateVenueInput } from './dto/create-venue.input';
import { UpdateVenueInput } from './dto/update-venue.input';
import { Venue } from './entities/venue.entity';


@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue)
    private readonly VenueRepository: Repository<Venue>,
    private readonly  companiesService: CompaniesService
  ) {}

  async create(
    createVenueInput: CreateVenueInput,
  ): Promise<Venue> {
    const { company_id } = createVenueInput

    const company = await this.companiesService.findOne(company_id);

    delete createVenueInput.company_id;

    const newVenue = this.VenueRepository.create({
      ...createVenueInput,
      company
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

  async findVenues(customer: number): Promise<Venue[]> {
    return await this.VenueRepository.find({
      where: {
        customer
      }
    });
  }

  async update(id: number, updateVenueInput: UpdateVenueInput): Promise<Venue> {
    const venue = await this.findOne(id);

    const { company_id } = updateVenueInput;

    const company = await this.companiesService.findOne(company_id);
    delete updateVenueInput.company_id;
    const editedVenue = this.VenueRepository.merge(venue,{
      ...updateVenueInput,
      company
    });

    return await this.VenueRepository.save(editedVenue);
  }

  async remove(id: number): Promise<Venue> {
    const venue = await this.findOne(id);
    return await this.VenueRepository.remove(venue);
  }
}
