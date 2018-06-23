import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options,
);

const db = {};

fs
  .readdirSync(__dirname)
  // Skip hidden files and index.js itself
  .filter(file => file.indexOf('.') > 0 && file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

export { Sequelize, sequelize };
export default db;

