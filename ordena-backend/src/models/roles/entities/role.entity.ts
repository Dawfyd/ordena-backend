import { ObjectType, Field } from '@nestjs/graphql';
import { BranchOffice } from 'src/models/branch-offices/entities/branch-office.entity';
import { RolesPerson } from 'src/models/roles-persons/entities/roles-person.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID del rol
   */
  id_role: number;

  /*
   * Nombre del rol
   */
  @Column()
  name_role: string;

  /*
   * Estado del rol
   */
  @Column()
  state_role: boolean;

  @ManyToOne(
    () => BranchOffice, 
    (branch_office: BranchOffice) => branch_office.roles)

  @JoinColumn({name: 'id_branch_office'})
  branch_office: BranchOffice;

  @OneToMany(
    (type) => RolesPerson, (roles_person: RolesPerson) => roles_person.role)
  
    roles_person?: RolesPerson[];

}
