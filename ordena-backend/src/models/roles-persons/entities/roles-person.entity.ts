import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from 'src/models/roles/entities/role.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  /*
  *fecha cuando se realizo el registro
  */
  @CreateDateColumn()
  created_at: Date;

  /*
  *fecha cuando se actualiza el registro
  */
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => Role,
    (role: Role) => role.roles_person)

  @JoinColumn({name: 'id_role'})
    role: Role;
}
