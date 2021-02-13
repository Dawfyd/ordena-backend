import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonsService } from '../persons/persons.service';
import { SpotsService } from '../spots/spots.service';
import { CreateWaiterAssignedSpotInput } from './dto/create-waiter-assigned-spot.input';
import { UpdateWaiterAssignedSpotInput } from './dto/update-waiter-assigned-spot.input';
import { WaiterAssignedSpot } from './entities/waiter-assigned-spot.entity';

@Injectable()
export class WaiterAssignedSpotsService {
  constructor (
    @InjectRepository(WaiterAssignedSpot)
    private readonly WaiterAssignedSpotRepository: Repository<WaiterAssignedSpot>,
    private readonly personsService: PersonsService,
    private readonly spotsService: SpotsService
  ) {}

  async create (createWaiterAssignedSpotInput: CreateWaiterAssignedSpotInput): Promise<WaiterAssignedSpot> {
    const { person_id, spot_id } = createWaiterAssignedSpotInput;

    const person = await this.personsService.findOne(person_id);
    // FIXME:
    const spot = {};

    const newWaiterAssignedSpot = this.WaiterAssignedSpotRepository.create({ ...createWaiterAssignedSpotInput, person, spot });

    return await this.WaiterAssignedSpotRepository.save(newWaiterAssignedSpot);
  }

  async findAll (): Promise<WaiterAssignedSpot[]> {
    return await this.WaiterAssignedSpotRepository.find();
  }

  async findOne (id: number): Promise<WaiterAssignedSpot> {
    const waiterAssignedSpot = await this.WaiterAssignedSpotRepository.findOne(id);
    if (!waiterAssignedSpot) throw new NotFoundException('no hay ninguna registro con este id');
    return waiterAssignedSpot;
  }

  async findPersonWaiterAssignedSpot (person: number): Promise<WaiterAssignedSpot[]> {
    return await this.WaiterAssignedSpotRepository.find({
      where: {
        person
      }
    });
  }

  async update (id: number, updateWaiterAssignedSpotInput: UpdateWaiterAssignedSpotInput): Promise<WaiterAssignedSpot> {
    const waiterAssignedSpot = await this.findOne(id);
    const { person_id, spot_id } = updateWaiterAssignedSpotInput;

    const person = await this.personsService.findOne(person_id);
    // FIXME:
    const spot = {};

    const editedWaiterAssignedSpot = this.WaiterAssignedSpotRepository.merge(waiterAssignedSpot, { person, spot, ...updateWaiterAssignedSpotInput });
    return await this.WaiterAssignedSpotRepository.save(editedWaiterAssignedSpot);
  }

  async remove (id: number): Promise<WaiterAssignedSpot> {
    const waiterAssignedSpot = await this.findOne(id);
    return await this.WaiterAssignedSpotRepository.remove(waiterAssignedSpot);
  }
}
