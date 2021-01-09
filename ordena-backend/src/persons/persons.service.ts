import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {

  constructor(
    @InjectRepository(Person)
    private readonly PersonRepository : Repository<Person>
  ) {}

  async create(createPersonInput: CreatePersonInput):Promise<Person> {
  const newPerson = this.PersonRepository.create(createPersonInput)
    return await this.PersonRepository.save(newPerson);
  }

  async findAll():Promise<Person[]>{
    return await this.PersonRepository.find();
  }

  async findOne(id: number):Promise<Person>{
    const person = await this.PersonRepository.findOne(id);
    if (!person) throw new NotFoundException('No hay una persona con esa ID');
    return person;
  }

  async update(id: number, updatePersonInput: UpdatePersonInput) {
    const person = await this.PersonRepository.findOne(id);
    if (!person) throw new NotFoundException('No hay una persona con esa ID');
    
    const editedPerson = Object.assign(person, updatePersonInput);
    return await this.PersonRepository.save(editedPerson);
  }

  async remove(id: number) {
    const person = await this.PersonRepository.findOne(id);
    if (!person) throw new NotFoundException('No hay una persona con esa ID');
    return await this.PersonRepository.remove(person);
  }
}
