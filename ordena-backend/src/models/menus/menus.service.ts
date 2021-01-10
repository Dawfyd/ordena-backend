import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly MenuRepository: Repository<Menu>,
  ) {}

  async create(createMenuInput: CreateMenuInput): Promise<Menu> {
    const newMenu = this.MenuRepository.create(createMenuInput);
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

  async update(id: number, updateMenuInput: UpdateMenuInput) {
    const menu = await this.MenuRepository.findOne(id);
    if (!menu) throw new NotFoundException('No hay un menu con esa ID');

    const editedMenu = Object.assign(menu, updateMenuInput);
    return await this.MenuRepository.save(editedMenu);
  }

  async remove(id: number) {
    const menu = await this.MenuRepository.findOne(id);
    if (!menu) throw new NotFoundException('No hay un menu con esa ID');
    return await this.MenuRepository.remove(menu);
  }
}
