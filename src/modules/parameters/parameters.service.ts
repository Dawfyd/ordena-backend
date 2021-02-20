import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParameterInput } from './dto/create-parameter.input';
import { UpdateParameterInput } from './dto/update-parameter.input';
import { Parameter } from './entities/parameter.entity';

@Injectable()
export class ParametersService {
  constructor (
    @InjectRepository(Parameter)
    private readonly ParameterRepository: Repository<Parameter>
  ) {}

  async create (createParameterInput: CreateParameterInput): Promise<Parameter> {
    const name = createParameterInput.name
      .trim()
      .toUpperCase()
      .split(' ')
      .join('_');

    const parameter = await this.findOneName(name);

    if (parameter) {
      throw new HttpException('El parametro ingresado ya existe en el sistema', HttpStatus.PRECONDITION_FAILED);
    }

    const newParameter = this.ParameterRepository.create({
      name,
      value: createParameterInput.value,
      description: createParameterInput.description
    });
    return await this.ParameterRepository.save(newParameter);
  }

  async findAll (): Promise<Parameter[]> {
    return await this.ParameterRepository.find();
  }

  async findOne (id: number): Promise<Parameter> {
    const parameter = await this.ParameterRepository.findOne(id);
    if (!parameter) throw new NotFoundException('No hay un parametro con esa ID');
    return parameter;
  }

  async findOneName (name: string): Promise<Parameter | null> {
    const parameter = await this.ParameterRepository.findOne({
      where: {
        name
      }
    });

    return parameter || null;
  }

  async update (id: number, updateParameterInput: UpdateParameterInput): Promise<Parameter> {
    const parameter = await this.findOne(id);

    let { name } = updateParameterInput;

    if (name) {
      name = name
        .trim()
        .toUpperCase()
        .split(' ')
        .join('_');

      const result = await this.findOneName(name);

      if (result) {
        throw new HttpException('El parametro ingresado ya existe en el sistema', HttpStatus.PRECONDITION_FAILED);
      }
    }

    const editedParameter = this.ParameterRepository.merge(parameter, {
      name,
      value: updateParameterInput.value,
      description: updateParameterInput.description
    });

    return await this.ParameterRepository.save(editedParameter);
  }

  async remove (id: number): Promise<Parameter> {
    const parameter = await this.findOne(id);
    return await this.ParameterRepository.remove(parameter);
  }
}
