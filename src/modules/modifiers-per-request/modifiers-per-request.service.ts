import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modifier } from '../modifiers/entities/modifier.entity';
import { ModifiersService } from '../modifiers/modifiers.service';
import { RequestsService } from '../requests/requests.service';
import { CreateModifiersPerRequestInput } from './dto/create-modifiers-per-request.input';
import { UpdateModifiersPerRequestInput } from './dto/update-modifiers-per-request.input';
import { ModifiersPerRequest } from './entities/modifiers-per-request.entity';

@Injectable()
export class ModifiersPerRequestService {
  constructor (
    @InjectRepository(ModifiersPerRequest)
    private readonly ModifiersPerRequestRepository: Repository<ModifiersPerRequest>,
    private readonly requestService: RequestsService,
    private readonly modifiersService: ModifiersService
  ) {}

  async create (createModifiersPerRequestInput: CreateModifiersPerRequestInput) {
    const { request_id, modifier_id } = createModifiersPerRequestInput;
    const request = await this.requestService.findOne(request_id as any);
    // FIXME:
    const modifier = await this.modifiersService.findOne({ companyUuid: '', id: 0 });

    const newModifiersPerRequest = this.ModifiersPerRequestRepository.create({ request, modifier });

    return await this.ModifiersPerRequestRepository.save(newModifiersPerRequest);
  }

  async findAll () {
    return await this.ModifiersPerRequestRepository.find();
  }

  async findOne (id: number) {
    const modifiersPerRequest = await this.ModifiersPerRequestRepository.findOne(id);
    if (!modifiersPerRequest) throw new NotFoundException('no hay solicitud por modificador con este id');
    return modifiersPerRequest;
  }

  async findModifierModifiersPerRequest (modifier: number): Promise<ModifiersPerRequest[]> {
    return await this.ModifiersPerRequestRepository.find({
      where: {
        modifier
      }
    });
  }

  async findRequestModifiersPerRequest (request: number): Promise<ModifiersPerRequest[]> {
    return await this.ModifiersPerRequestRepository.find({
      where: {
        request
      }
    });
  }

  async update (id: number, updateModifiersPerRequestInput: UpdateModifiersPerRequestInput) {
    const modifiersPerRequest = await this.findOne(id);
    const { request_id, modifier_id } = updateModifiersPerRequestInput;
    const request = await this.requestService.findOne(request_id as any);
    // FIXME
    const modifier = await this.modifiersService.findOne({ companyUuid: '', id: 0 });

    const editedModifiersPerRequest = this.ModifiersPerRequestRepository.merge(modifiersPerRequest, { request, modifier });
    return await this.ModifiersPerRequestRepository.save(editedModifiersPerRequest);
  }

  async remove (id: number) {
    const modifiersPerRequest = await this.findOne(id);
    return await this.ModifiersPerRequestRepository.remove(modifiersPerRequest);
  }
}
