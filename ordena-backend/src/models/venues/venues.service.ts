import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVenueInput } from './dto/create-venue.input';
import { UpdateVenueInput } from './dto/update-venue.input';
import { Venue } from './entities/venue.entity';


@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue)
    private readonly VenueRepository: Repository<Venue>,
  ) {}

  async create(
    createVenueInput: CreateVenueInput,
  ): Promise<Venue> {
    const newVenue = this.VenueRepository.create(
      createVenueInput,
    );
    return await this.VenueRepository.save(newVenue);
  }

  async findAll(): Promise<Venue[]> {
    return await this.VenueRepository.find();
  }

  async findOne(id: number): Promise<Venue> {
    const branch_office = await this.VenueRepository.findOne(id);
    if (!branch_office)
      throw new NotFoundException('No hay una sede con esa ID');
    return branch_office;
  }

  async update(id: number, updateVenueInput: UpdateVenueInput) {
    const branch_office = await this.VenueRepository.findOne(id);
    if (!branch_office)
      throw new NotFoundException('No hay una sede con esa ID');

    const editedVenue = Object.assign(
      branch_office,
      updateVenueInput,
    );
    return await this.VenueRepository.save(editedVenue);
  }

  async remove(id: number) {
    const branch_office = await this.VenueRepository.findOne(id);
    if (!branch_office)
      throw new NotFoundException('No hay una sede con esa ID');
    return await this.VenueRepository.remove(branch_office);
  }
}
