import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicAclService } from 'src/common/integrations/basic-acl/basic-acl.service';
import { Repository } from 'typeorm';
import { ParametersService } from '../parameters/parameters.service';
import { ChangePasswordInput } from './dto/change-password-input';
import { CreatePersonInput } from './dto/create-person.input';
import { SendForgottenPasswordEmailInput } from './dto/send-forgotten-password-email-input';
import { UpdatePersonInput } from './dto/update-person.input';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly PersonRepository: Repository<Person>,
    private readonly basicAclService: BasicAclService,
    private readonly parametersService: ParametersService
  ) {}

  async createAdmin(createPersonInput: CreatePersonInput): Promise<Person> {

    const admin = await this.parametersService.findOneName('ADMIN_ROLE');

    if(!admin){
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
      const newPerson = this.PersonRepository.create({
        ...createPersonInput,
        authUid
      });

      return await this.PersonRepository.save(newPerson);
    } catch (error) {
      await this.basicAclService.removeUser(user.id);
    }
  }

  async createWaiter(createPersonInput: CreatePersonInput): Promise<Person> {

    const admin = await this.parametersService.findOneName('WAITER_ROLE');

    if(!admin){
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
      const newPerson = this.PersonRepository.create({
        ...createPersonInput,
        authUid
      });

      return await this.PersonRepository.save(newPerson);
    } catch (error) {
      await this.basicAclService.removeUser(user.id);
    }
  }

  async createCustomer(createPersonInput: CreatePersonInput): Promise<Person> {

    const admin = await this.parametersService.findOneName('CUSTOMER_ROLE');

    if(!admin){
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
      const newPerson = this.PersonRepository.create({
        ...createPersonInput,
        authUid
      });

      return await this.PersonRepository.save(newPerson);
    } catch (error) {
      await this.basicAclService.removeUser(user.id);
    }
  }

  async findAll(): Promise<Person[]> {
    return await this.PersonRepository.find();
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.PersonRepository.findOne(id);
    if (!person) throw new NotFoundException('No hay una persona con esa ID');
    return person;
  }

  async update(id: number, updatePersonInput: UpdatePersonInput): Promise<Person> {
    const person = await this.findOne(id);

    const originPerson = { ...person };

    const user = await this.basicAclService.findUser(person.authUid);

    const { email, phone } = updatePersonInput;

    if(email){
      await this.basicAclService.updateUser(user.id, email);
    }

    if(phone){
      const mail =  email ?? person.email;
      await this.basicAclService.changePhone(mail, phone);
    }

    try {

      const editedPerson = this.PersonRepository.merge(person, updatePersonInput);
      return await this.PersonRepository.save(editedPerson);

    } catch (error) {
      await this.basicAclService.updateUser(user.id, originPerson.email);
      await this.basicAclService.changePhone(originPerson.email, originPerson.phone);
    }
  }

  async remove(id: number) {
    const person = await this.findOne(id);
    const user = await this.basicAclService.findUser(person.authUid);

    await this.basicAclService.removeUser(user.id);
    return await this.PersonRepository.remove(person);
  }

  async sendForgottenPasswordEmail(sendForgottenPasswordEmailInput: SendForgottenPasswordEmailInput): Promise<Person> {

    const person = await this.PersonRepository.findOne({
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

  async changePassword(changePasswordInput: ChangePasswordInput): Promise<Person> {

    const person = await this.PersonRepository.findOne({
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
}
