import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { Customs } from './src/entities/Customs';
import { Users } from './src/entities/Users';
import { Pets } from './src/entities/Pets';
import { Groups } from './src/entities/Groups';
import { Meals } from './src/entities/Meals';
import { Showers } from './src/entities/Showers';
import { Toilets } from './src/entities/Toilets';
import { Walks } from './src/entities/Walks';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Pets, Groups, Meals, Showers, Toilets, Walks, Customs],
  migrations: [__dirname + '/src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});

export default dataSource;
