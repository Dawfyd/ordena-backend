import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VenuesService } from '../venues/venues.service';
import { CreateSpotInput } from './dto/create-spot.input';
import { UpdateSpotInput } from './dto/update-spot.input';
import { Spot } from './entities/spot.entity';

@Injectable()
export class SpotsService {
  constructor(
    @InjectRepository(Spot)
    private readonly SpotRepository: Repository<Spot>,
    private readonly venuesService: VenuesService
  ) {}

  async create(createSpotInput: CreateSpotInput): Promise<Spot> {
    const { venue_id } = createSpotInput;
    const venue = await this.venuesService.findOne(venue_id);

    const newSpot = this.SpotRepository.create({...createSpotInput, venue});
    return await this.SpotRepository.save(newSpot);
  }

  async findAll(): Promise<Spot[]> {
    return await this.SpotRepository.find();
  }

  async findOne(id: number): Promise<Spot> {
    const spot = await this.SpotRepository.findOne(id);
    if (!spot) throw new NotFoundException('No hay una mesa con esa ID');
    return spot;
  }

  async findSpost(venue: number): Promise<Spot[]> {
    return await this.SpotRepository.find({
      where: {
        venue
      }
    });
  }

  async update(id: number, updateSpotInput: UpdateSpotInput) {
    const spot = await this.findOne(id);

    const { venue_id } =  updateSpotInput;

    const venue = await this.venuesService.findOne(venue_id);

    const editedSpot = this.SpotRepository.merge(spot, { ...updateSpotInput, venue});
    return await this.SpotRepository.save(editedSpot);
  }

  async remove(id: number) {
    const spot = await this.findOne(id);
    return await this.SpotRepository.remove(spot);
  }
}
