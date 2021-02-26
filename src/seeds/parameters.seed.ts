import { Connection } from 'typeorm';
import { Parameter } from '../modules/parameters/entities/parameter.entity';

export const ParameterFactory = {
  build: (connection: Connection): Parameter[] => {
    const items = [
      {
        name: 'WAITER_ROLE',
        value: '03W',
        description: 'waiter role in ACL'
      }
    ];

    return items.map(item => connection.getRepository(Parameter).create({
      name: item.name,
      value: item.value,
      description: item.description || undefined
    }));
  },

  handle: async (connection: Connection): Promise<void> => {
    const items = ParameterFactory.build(connection);

    for (const item of items) {
      const existing = await connection.getRepository(Parameter).createQueryBuilder('p')
        .where('p.name = :name', { name: item.name })
        .getOne();

      let itemToSave;

      if (existing) {
        itemToSave = await connection.getRepository(Parameter).preload({
          id: existing.id,
          value: item.value,
          description: item.description
        });
      } else itemToSave = item;

      await connection.getRepository(Parameter).save(itemToSave);
    }
  },

  entity: Parameter
};
