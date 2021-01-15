import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VenuesService } from '../venues/venues.service';
import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly MenuRepository: Repository<Menu>,
    private readonly venuesService: VenuesService
  ) {}

  async create(createMenuInput: CreateMenuInput): Promise<Menu> {
    const { id_venue } = createMenuInput;

    const venue = await this.venuesService.findOne(id_venue);
    delete createMenuInput.id_venue;
    const newMenu = this.MenuRepository.create({
      ...createMenuInput,
      venue
    });

    return await this.MenuRepository.save(newMenu);
  }

  async findAll(): Promise<Menu[]> {
    return await this.MenuRepository.find();
  }

  async findOne(id: number): Promise<Menu> {
    const menu = await this.MenuRepository.findOne(id);
    if (!menu) throw new NotFoundException('No hay un menu con esa ID');
    return menu;
  }

  async update(id: number, updateMenuInput: UpdateMenuInput): Promise<Menu> {
    const menu = await this.findOne(id);

    const { id_venue } = updateMenuInput;

    const venue = await this.venuesService.findOne(id_venue);
    delete updateMenuInput.id_venue;
    const editedMenu = this.MenuRepository.merge(menu, {
      ...updateMenuInput,
      venue
    });

    return await this.MenuRepository.save(editedMenu);
  }

  async remove(id: number): Promise<Menu> {
    const menu = await this.findOne(id);
    return await this.MenuRepository.remove(menu);
  }
}
