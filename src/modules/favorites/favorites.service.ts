import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonsService } from '../persons/persons.service';
import { ProductsService } from '../products/products.service';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { UpdateFavoriteInput } from './dto/update-favorite.input';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly FavoriteRepository: Repository<Favorite>,
    private readonly personsService: PersonsService,
    private readonly productsService: ProductsService
  ) {}

  async create(createFavoriteInput: CreateFavoriteInput): Promise<Favorite> {
    const { product_id, person_id } = createFavoriteInput;

    const person = await this.personsService.findOne(person_id);
    const product = await this.productsService.findOne(product_id);

    const newFavorite = this.FavoriteRepository.create({
      ...createFavoriteInput,
      person,
      product
    });

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

  async findFavoritesPerson(person: number): Promise<Favorite[]> {
    return await this.FavoriteRepository.find({
      where: {
        person
      }
    });
  }

  async findFavoritesProduct(product: number): Promise<Favorite[]> {
    return await this.FavoriteRepository.find({
      where: {
        product
      }
    });
  }

  async update(id: number, updateFavoriteInput: UpdateFavoriteInput): Promise<Favorite>  {
    const favorite = await this.findOne(id);

    const { product_id, person_id } = updateFavoriteInput;

    const person = await this.personsService.findOne(person_id);
    const product = await this.productsService.findOne(product_id);

    const editedFavorite = this.FavoriteRepository.merge(favorite, {
      ...updateFavoriteInput,
      person,
      product
    });
    return await this.FavoriteRepository.save(editedFavorite);
  }

  async remove(id: number): Promise<Favorite>{
    const favorite = await this.findOne(id);
    return await this.FavoriteRepository.remove(favorite);
  }
}
