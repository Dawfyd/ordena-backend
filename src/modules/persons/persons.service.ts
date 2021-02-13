import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BasicAclService } from 'src/common/integrations/basic-acl/basic-acl.service';

import { ParametersService } from '../parameters/parameters.service';
import { ChangePasswordInput } from './dto/change-password-input.dto';
import { CreatePersonInput } from './dto/create-person.input.dto';
import { FindAllPersonsInput } from './dto/find-all-persons-input.dto';
import { FindAllWorkersInput } from './dto/find-all-workers-input.dto';
import { FindOnePersonInput } from './dto/find-person-one-input.dto';
import { SendForgottenPasswordEmailInput } from './dto/send-forgotten-password-email-input.dto';
import { UpdatePersonInput } from './dto/update-person.input.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {
  constructor (
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private readonly basicAclService: BasicAclService,
    private readonly parametersService: ParametersService
  ) {}

  /* CRUD RELATED OPERATIONS */

  public async createAdmin (createPersonInput: CreatePersonInput): Promise<Person> {
    const admin = await this.parametersService.findOneName('ADMIN_ROLE');

    if (!admin) {
      throw new PreconditionFailedException('El parametro para identificar el código del rol (admin) debe estar configurado.');
    }

    const user = await this.basicAclService.createUser(
      createPersonInput.email,
      createPersonInput.password,
      createPersonInput.phone,
      admin.value
    );

    try {
      const { authUid } = user;
      const newPerson = this.personRepository.create({
        ...createPersonInput,
        authUid
      });

      return await this.personRepository.save(newPerson);
    } catch (error) {
      await this.basicAclService.removeUser(user.id);
    }
  }

  public async createWaiter (createPersonInput: CreatePersonInput): Promise<Person> {
    const admin = await this.parametersService.findOneName('WAITER_ROLE');

    if (!admin) {
      throw new PreconditionFailedException('El parametro para identificar el código del rol (waiter) debe estar configurado.');
    }

    const user = await this.basicAclService.createUser(
      createPersonInput.email,
      createPersonInput.password,
      createPersonInput.phone,
      admin.value
    );

    try {
      const { authUid } = user;
      const newPerson = this.personRepository.create({
        ...createPersonInput,
        authUid
      });

      return await this.personRepository.save(newPerson);
    } catch (error) {
      await this.basicAclService.removeUser(user.id);
    }
  }

  public async createCustomer (createPersonInput: CreatePersonInput): Promise<Person> {
    const admin = await this.parametersService.findOneName('CUSTOMER_ROLE');

    if (!admin) {
      throw new PreconditionFailedException('El parametro para identificar el código del rol (customer) debe estar configurado.');
    }

    const user = await this.basicAclService.createUser(
      createPersonInput.email,
      createPersonInput.password,
      createPersonInput.phone,
      admin.value
    );

    try {
      const { authUid } = user;
      const newPerson = this.personRepository.create({
        ...createPersonInput,
        authUid
      });

      return await this.personRepository.save(newPerson);
    } catch (error) {
      await this.basicAclService.removeUser(user.id);
    }
  }

  public async findAll (findAllPersonsInput : FindAllPersonsInput): Promise<Person[]> {
    const { limit, skip, search = '' } = findAllPersonsInput;

    const query = this.personRepository.createQueryBuilder('p');

    if (search) {
      query.where('p.name ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('p.id', 'DESC');

    const persons = await query.getMany();

    return persons;
  }

  public async findAllWorkers (findAllWorkersInput : FindAllWorkersInput): Promise<Person[]> {
    const { limit, skip, search = '', companyUuid } = findAllWorkersInput;

    const query = this.personRepository.createQueryBuilder('p')
      .innerJoin('p.assignedVenues', 'av')
      .innerJoin('av.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    if (search) {
      query.where('p.name ilike :search', { search: `%${search}%` })
        .orWhere('p.email ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('p.id', 'DESC');

    const persons = await query.getMany();

    return persons;
  }

  public async findOne (findOnePersonInput: FindOnePersonInput): Promise<Person | null> {
    const { authUid } = findOnePersonInput;

    const person = await this.personRepository.findOne({
      authUid
    });

    return person || null;
  }

  public async update (findOnePersonInput: FindOnePersonInput, updatePersonInput: UpdatePersonInput): Promise<Person> {
    const person = await this.findOne(findOnePersonInput);

    if (!person) {
      throw new NotFoundException(`can't get the person with authUid ${findOnePersonInput.authUid}.`);
    }

    const originPerson = { ...person };

    const user = await this.basicAclService.findUser(person.authUid);

    const { email, phone } = updatePersonInput;

    if (email) {
      await this.basicAclService.updateUser(user.id, email);
    }

    if (phone) {
      const mail = email ?? person.email;
      await this.basicAclService.changePhone(mail, phone);
    }

    try {
      const editedPerson = this.personRepository.merge(person, updatePersonInput);
      return await this.personRepository.save(editedPerson);
    } catch (error) {
      await this.basicAclService.updateUser(user.id, originPerson.email);
      await this.basicAclService.changePhone(originPerson.email, originPerson.phone);
    }
  }

  public async remove (findOnePersonInput: FindOnePersonInput): Promise<Person> {
    const person = await this.findOne(findOnePersonInput);

    if (!person) {
      throw new NotFoundException(`can't get the person with authUid ${findOnePersonInput.authUid}.`);
    }

    const user = await this.basicAclService.findUser(person.authUid);

    const clone = { ...person };

    await this.basicAclService.removeUser(user.id);

    await this.personRepository.remove(person);

    return clone;
  }

  public async sendForgottenPasswordEmail (sendForgottenPasswordEmailInput: SendForgottenPasswordEmailInput): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: {
        email: sendForgottenPasswordEmailInput.email
      }
    });

    if (!person) throw new NotFoundException('No existe una persona con ese email.');

    await this.basicAclService.sendForgottenPasswordEmail(
      sendForgottenPasswordEmailInput.email
    );

    return person;
  }

  public async changePassword (changePasswordInput: ChangePasswordInput): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: {
        email: changePasswordInput.email
      }
    });

    if (!person) throw new NotFoundException('No existe una persona con ese email.');

    await this.basicAclService.changePassword(
      changePasswordInput.email,
      changePasswordInput.oldPassword,
      changePasswordInput.newPassword
    );

    return person;
  }

  /* CRUD RELATED OPERATIONS */

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  public async getByIds (ids: number[]): Promise<Person[]> {
    return this.personRepository.findByIds(ids, {
      loadRelationIds: true
    });
  }

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */

  public async favorites (person: Person): Promise<any[]> {
    const { id } = person;

    const master = await this.personRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.favorites', 'f')
      .where('p.id = :id', { id })
      .getOne();

    const items = master ? master.favorites : [];

    return items.map(item => ({ ...item, person: master.id }));
  }

  public async customerAssignedSpot (person: Person): Promise<any[]> {
    const { id } = person;

    const master = await this.personRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.customerAssignedSpot', 'c')
      .where('p.id = :id', { id })
      .getOne();

    const items = master ? master.customerAssignedSpot : [];

    return items.map(item => ({ ...item, person: master.id }));
  }

  public async assignedVenues (person: Person): Promise<any[]> {
    const { id } = person;

    const master = await this.personRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.assignedVenues', 'a')
      .where('p.id = :id', { id })
      .getOne();

    const items = master ? master.assignedVenues : [];

    return items.map(item => ({ ...item, person: master.id }));
  }

  public async waiterAssignedSpots (person: Person): Promise<any[]> {
    const { id } = person;

    const master = await this.personRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.waiterAssignedSpots', 'w')
      .where('p.id = :id', { id })
      .getOne();

    const items = master ? master.waiterAssignedSpots : [];

    return items.map(item => ({ ...item, person: master.id }));
  }

  public async orders (person: Person): Promise<any[]> {
    const { id } = person;

    const master = await this.personRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.orders', 'o')
      .where('p.id = :id', { id })
      .getOne();

    const items = master ? master.orders : [];

    return items.map(item => ({ ...item, person: master.id }));
  }

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */
}
