import { ObjectType, Field } from '@nestjs/graphql';
import { BranchOffice } from 'src/models/branch-offices/entities/branch-office.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
@ObjectType()
export class Customer {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID del cliente
   */
  id_customer: number;

  /*
   * Nombre del cliente
   */
  @Column()
  name_customer: string;

  /*
   *  Email del cliente
   */
  @Column()
  email_customer: string;

  /*
   * Nit del cliente
   */
  @Column()
  nit_customer: number;

  /*
   * Telefono del cliente
   */
  @Column()
  telephone_customer: number;

  @OneToMany(
    (type) => BranchOffice, (branch_offices: BranchOffice) => branch_offices.customer, {
      eager: true,
      cascade: true,
    })
  
    branch_offices?: BranchOffice[];
}