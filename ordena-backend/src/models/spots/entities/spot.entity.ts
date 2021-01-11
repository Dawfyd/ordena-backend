import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BranchOffice } from 'src/models/branch-offices/entities/branch-office.entity';
import { Person } from 'src/models/persons/entities/person.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spots')
@ObjectType()
export class Spot {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID de la mesa
   */
  id_spot: number;

  /*
   * Estado de la mesa
   */
  @Column()
  state_spot: string;

  /*
   * Nombre de la mesa
   */
  @Column()
  name_spot: string;

  /*
   * Numero de la mesa
   */
  @Column()
  number_spot: number;

  @ManyToOne(
    () => BranchOffice, 
    (branch_office: BranchOffice) => branch_office.spots)

  @JoinColumn({name: 'id_branch_office'})
    branch_office: BranchOffice;

  @OneToMany(
    (type) => Person, (persons: Person) => persons.spot, {
    eager: true,
    cascade: true,
  })
    persons?: Person[];
}
