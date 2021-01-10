import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { UpdateFavoriteInput } from './dto/update-favorite.input';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly FavoriteRepository: Repository<Favorite>,
  ) {}

  async create(createFavoriteInput: CreateFavoriteInput): Promise<Favorite> {
    const newFavorite = this.FavoriteRepository.create(createFavoriteInput);
    return await this.FavoriteRepository.save(newFavorite);
  }

  async findAll(): Promise<Favorite[]> {
    return await this.FavoriteRepository.find();
  }

  async findOne(id: number): Promise<Favorite> {
    const favorite = await this.FavoriteRepository.findOne(id);
    if (!favorite) throw new NotFoundException('No hay un favorito con esa ID');
    return favorite;
  }

  async update(id: number, updateFavoriteInput: UpdateFavoriteInput) {
    const favorite = await this.FavoriteRepository.findOne(id);
    if (!favorite) throw new NotFoundException('No hay un favorito con esa ID');

    const editedFavorite = Object.assign(favorite, updateFavoriteInput);
    return await this.FavoriteRepository.save(editedFavorite);
  }

  async remove(id: number) {
    const favorite = await this.FavoriteRepository.findOne(id);
    if (!favorite) throw new NotFoundException('No hay un favorito con esa ID');
    return await this.FavoriteRepository.remove(favorite);
  }
}
