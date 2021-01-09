import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpotInput } from './dto/create-spot.input';
import { UpdateSpotInput } from './dto/update-spot.input';
import { Spot } from './entities/spot.entity';

@Injectable()
export class SpotsService {
  
  constructor(
    @InjectRepository(Spot)
    private readonly SpotRepository : Repository<Spot>
  ) {}

  async create(createSpotInput: CreateSpotInput):Promise<Spot> {
  const newSpot = this.SpotRepository.create(createSpotInput)
    return await this.SpotRepository.save(newSpot);
  }

  async findAll():Promise<Spot[]>{
    return await this.SpotRepository.find();
  }

  async findOne(id: number):Promise<Spot>{
    const spot = await this.SpotRepository.findOne(id);
    if (!spot) throw new NotFoundException('No hay una mesa con esa ID');
    return spot;
  }

  async update(id: number, updateSpotInput: UpdateSpotInput) {
    const spot = await this.SpotRepository.findOne(id);
    if (!spot) throw new NotFoundException('No hay una mesa con esa ID');
    
    const editedSpot = Object.assign(spot, updateSpotInput);
    return await this.SpotRepository.save(editedSpot);
  }

  async remove(id: number) {
    const spot = await this.SpotRepository.findOne(id);
    if (!spot) throw new NotFoundException('No hay una mesa con esa ID');
    return await this.SpotRepository.remove(spot);
  }
}
