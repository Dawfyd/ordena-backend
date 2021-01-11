import { ObjectType, Field } from '@nestjs/graphql';
import { Person } from 'src/models/persons/entities/person.entity';
import { Role } from 'src/models/roles/entities/role.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles_persons')
@ObjectType()
export class RolesPerson {
  @PrimaryGeneratedColumn()
  @Field()
  /*
   * ID de la relacion de rol y persona
   */
  id_role_person: number;

  /*
   * Estado de la relacion de rol y persona
   */
  @Column()
  state_role_person: boolean;

  @ManyToOne(
    () => Person, 
    (person: Person) => person.roles_person)

  @JoinColumn({name: 'id_person'})
    person: Person;

  @ManyToOne(
    () => Role, 
    (role: Role) => role.roles_person)
  
  @JoinColumn({name: 'id_role'})
    role: Role;
}
