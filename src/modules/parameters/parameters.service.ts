import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Parameter } from './entities/parameter.entity';

import { CreateParameterInput } from './dto/create-parameter.input';
import { GetParameterValueInput } from './dto/get-parameter-value-input.dto';
import { UpdateParameterInput } from './dto/update-parameter.input';

@Injectable()
export class ParametersService {
  constructor (
    @InjectRepository(Parameter)
    private readonly parameterRepository: Repository<Parameter>
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

    const newParameter = this.parameterRepository.create({
      name,
      value: createParameterInput.value,
      description: createParameterInput.description
    });
    return await this.parameterRepository.save(newParameter);
  }

  async findAll (): Promise<Parameter[]> {
    return await this.parameterRepository.find();
  }

  async findOne (id: number): Promise<Parameter> {
    const parameter = await this.parameterRepository.findOne(id);
    if (!parameter) throw new NotFoundException('No hay un parametro con esa ID');
    return parameter;
  }

  async findOneName (name: string): Promise<Parameter | null> {
    const parameter = await this.parameterRepository.findOne({
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

    const editedParameter = this.parameterRepository.merge(parameter, {
      name,
      value: updateParameterInput.value,
      description: updateParameterInput.description
    });

    return await this.parameterRepository.save(editedParameter);
  }

  async remove (id: number): Promise<Parameter> {
    const parameter = await this.findOne(id);
    return await this.parameterRepository.remove(parameter);
  }

  async getValue (getParameterValueInput: GetParameterValueInput): Promise<string> {
    const { name } = getParameterValueInput;

    const parameter = await this.parameterRepository.createQueryBuilder('p')
      .where('p.name = :name', { name })
      .getOne();

    if (!parameter) {
      throw new NotFoundException(`can't get the parameter with name ${name}.`);
    }

    return parameter.value;
  }
}
