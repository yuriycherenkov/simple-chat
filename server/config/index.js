import dotenv from 'dotenv';
import db from './sequelize';

dotenv.load();

export const env = process.env.NODE_ENV || 'development';
const dbOptions = db[env];

const config = {
  api: {
    url: process.env.PUBLIC_URL || 'http://localhost:4000',
    port: process.env.PORT || 4000,
  },
  db: { // this is tricky way to make old sequelize-cli work with new sequelize v4 config
    database: dbOptions.database,
    username: dbOptions.username,
    password: dbOptions.password,
    options: {
      define: dbOptions.define,
      dialect: dbOptions.dialect,
      host: dbOptions.host,
      port: dbOptions.port,
      ...dbOptions.options,
    },
  },
};

export default config;
