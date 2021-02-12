import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VenuesService } from '../venues/venues.service';
import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenusService {
  constructor (
    @InjectRepository(Menu)
    private readonly MenuRepository: Repository<Menu>,
    private readonly venuesService: VenuesService
  ) {}

  async create (createMenuInput: CreateMenuInput): Promise<Menu> {
    const { venue_id } = createMenuInput;

    // FIXME:
    const venue = {};
    delete createMenuInput.venue_id;
    const newMenu = this.MenuRepository.create({
      ...createMenuInput,
      venue
    });

    return await this.MenuRepository.save(newMenu);
  }

  async findAll (): Promise<Menu[]> {
    return await this.MenuRepository.find();
  }

  async findMenus (venue: number): Promise<Menu[]> {
    return await this.MenuRepository.find({
      where: {
        venue
      }
    });
  }

  async findOne (id: number): Promise<Menu> {
    const menu = await this.MenuRepository.findOne(id);
    if (!menu) throw new NotFoundException('No hay un menu con esa ID');
    return menu;
  }

  async update (id: number, updateMenuInput: UpdateMenuInput): Promise<Menu> {
    const menu = await this.findOne(id);

    const { venue_id } = updateMenuInput;

    const venue = {};
    delete updateMenuInput.venue_id;
    const editedMenu = this.MenuRepository.merge(menu, {
      ...updateMenuInput,
      venue
    });

    return await this.MenuRepository.save(editedMenu);
  }

  async remove (id: number): Promise<Menu> {
    const menu = await this.findOne(id);
    return await this.MenuRepository.remove(menu);
  }
}
