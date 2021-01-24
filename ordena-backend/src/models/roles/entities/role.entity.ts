import { ObjectType, Field } from '@nestjs/graphql';
import { Venue } from 'src/models/venues/entities/venue.entity';
import { RolesPerson } from 'src/models/roles-persons/entities/roles-person.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

   /*
   * ID de la sede
   */
  @ManyToOne(
    () => Venue,
    (venue: Venue) => venue.roles)

  @JoinColumn({name: 'id_venue'})
  venue: Venue;

  @OneToMany(
    (type) => RolesPerson, (roles_person: RolesPerson) => roles_person.role, {
      eager: true,
      cascade: true,
    })
    roles_person?: RolesPerson[];
}
