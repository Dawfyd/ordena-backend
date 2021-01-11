import { ObjectType, Field } from '@nestjs/graphql';
import { Customer } from 'src/models/customers/entities/customer.entity';
import { Menu } from 'src/models/menus/entities/menu.entity';
import { Role } from 'src/models/roles/entities/role.entity';
import { Spot } from 'src/models/spots/entities/spot.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('branch_offices')
@ObjectType()
export class BranchOffice {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID de la sede o sucursal
   */
  id_branch_office: number;

  /*
   * Descripcion de la sede o sucursal
   */
  @Column()
  description_branch_office: string;

  /*
   * Ubicacion de la sede o sucursal
   */
  @Column()
  location_branch_office: string;

  /*
   * Ciudad de la sede o sucursal
   */
  @Column()
  city_branch_office: string;

  /*
   * Nombre de la sede o sucursal
   */
  @Column()
  name_branch_office: string;

  @ManyToOne(
    () => Customer, 
    (customer: Customer) => customer.branch_offices)

  @JoinColumn({name: 'id_customer'})
    customer: Customer;

  @OneToMany(
    (type) => Menu, (menus: Menu) => menus.branch_office, {
      eager: true,
      cascade: true,
    })
  
    menus?: Menu[];

  @OneToMany(
    (type) => Spot, (spots: Spot) => spots.branch_office, {
      eager: true,
      cascade: true,
    })
  
    spots?: Spot[];

  @OneToMany(
    (type) => Role, (roles: Role) => roles.branch_office, {
      eager: true,
      cascade: true,
    })
  
    roles?: Role[];
  
    
}
