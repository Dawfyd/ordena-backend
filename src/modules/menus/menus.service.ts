import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Menu } from './entities/menu.entity';

import { VenuesService } from '../venues/venues.service';

import { CreateMenuInput } from './dto/create-menu-input.dto';
import { UpdateMenuInput } from './dto/update-menu.input';
import { FindAllMenusInput } from './dto/find-all-menus-input.dto';
import { FindOneMenuInput } from './dto/find-one-menu-input.dto';

@Injectable()
export class MenusService {
  constructor (
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    private readonly venuesService: VenuesService
  ) {}

  /* CRUD RELATED OPERATIONS */

  async create (createMenuInput: CreateMenuInput): Promise<Menu> {
    const { companyUuid, venueId } = createMenuInput;

    const venue = await this.venuesService.findOne({ companyUuid, id: venueId });

    if (!venue) {
      throw new NotFoundException(`can't get the venue ${venueId} for the company ${companyUuid}.`);
    }

    const created = this.menuRepository.create({
      ...createMenuInput,
      venue
    });

    const saved = await this.menuRepository.save(created);

    return saved;
  }

  async findAll (findAllMenusInput: FindAllMenusInput): Promise<Menu[]> {
    const { companyUuid, limit, skip, search } = findAllMenusInput;

    const query = this.menuRepository.createQueryBuilder('m')
      .loadAllRelationIds()
      .innerJoin('m.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    if (search) {
      query.andWhere('m.name ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('m.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  async findOne (findOneMenuInput: FindOneMenuInput): Promise<Menu | null> {
    const { companyUuid, id } = findOneMenuInput;

    const item = await this.menuRepository.createQueryBuilder('m')
      .loadAllRelationIds()
      .innerJoin('m.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('m.id = :id', { id })
      .getOne();

    return item || null;
  }

  async update (findOneMenuInput: FindOneMenuInput, updateMenuInput: UpdateMenuInput): Promise<Menu> {
    const { companyUuid, id } = findOneMenuInput;

    const existing = await this.findOne(findOneMenuInput);

    if (!existing) {
      throw new NotFoundException(`can't get the menu ${id} for the company with uuid ${companyUuid}.`);
    }

    const { venueId } = updateMenuInput;

    let venue;

    if (venueId) {
      venue = await this.venuesService.findOne({ companyUuid, id: venueId });

      if (!venue) {
        throw new NotFoundException(`can't get the venue ${venueId} for the company with uuid ${companyUuid}.`);
      }
    }

    const preloaded = await this.menuRepository.preload({
      id: existing.id,
      ...updateMenuInput,
      venue
    });

    const saved = await this.menuRepository.save(preloaded);

    return saved;
  }

  async remove (findOneMenuInput: FindOneMenuInput): Promise<Menu> {
    const { companyUuid, id } = findOneMenuInput;

    const existing = await this.findOne(findOneMenuInput);

    if (!existing) {
      throw new NotFoundException(`can't get the menu ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.menuRepository.remove(existing);

    return clone;
  }

  /* CRUD RELATED OPERATIONS */

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  public async getByIds (ids: number[]): Promise<Menu[]> {
    return this.menuRepository.findByIds(ids, {
      loadRelationIds: true
    });
  }

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */

  async categories (menu: Menu): Promise<any[]> {
    const { id } = menu;

    const master = await this.menuRepository.createQueryBuilder('m')
      .leftJoinAndSelect('m.categories', 'c')
      .where('m.id = :id', { id })
      .getOne();

    const items = master ? master.categories : [];

    return items.map(item => ({ ...item, menu: master.id }));
  }

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */
}
