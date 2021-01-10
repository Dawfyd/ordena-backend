import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PricesService } from './prices.service';
import { Price } from './entities/price.entity';
import { CreatePriceInput } from './dto/create-price.input';
import { UpdatePriceInput } from './dto/update-price.input';

@Resolver(() => Price)
export class PricesResolver {
  constructor(private readonly pricesService: PricesService) {}

  @Mutation(() => Price)
  createPrice(@Args('createPriceInput') createPriceInput: CreatePriceInput) {
    return this.pricesService.create(createPriceInput);
  }

  @Query(() => [Price], { name: 'prices' })
  findAll() {
    return this.pricesService.findAll();
  }

  @Query(() => Price, { name: 'price' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pricesService.findOne(id);
  }

  @Mutation(() => Price)
  updatePrice(@Args('updatePriceInput') updatePriceInput: UpdatePriceInput) {
    return this.pricesService.update(
      updatePriceInput.id_price,
      updatePriceInput,
    );
  }

  @Mutation(() => Price)
  removePrice(@Args('id', { type: () => Int }) id: number) {
    return this.pricesService.remove(id);
  }
}
