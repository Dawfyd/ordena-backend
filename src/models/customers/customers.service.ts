import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly CustomerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    const newCustomer = this.CustomerRepository.create(createCustomerInput);
    return await this.CustomerRepository.save(newCustomer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.CustomerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.CustomerRepository.findOne(id);
    if (!customer) throw new NotFoundException('No hay un cliente con esa ID');
    return customer;
  }

  async update(id: number, updateCustomerInput: UpdateCustomerInput): Promise<Customer> {
    const customer = await this.findOne(id);

    const editedCustomer = this.CustomerRepository.merge(customer, updateCustomerInput);
    return await this.CustomerRepository.save(editedCustomer);
  }

  async remove(id: number): Promise<Customer> {
    const customer = await this.findOne(id);
    return await this.CustomerRepository.remove(customer);
  }
}
