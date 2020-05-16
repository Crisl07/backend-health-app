import { SequelizeConfig } from '../config/sequelizeconfiginterface';
import { createModels } from '../models/index';
import { seed } from '../seed/index';

const sequelizeConfig: SequelizeConfig = require('../config/config.json');
export const db = createModels(sequelizeConfig);

const sync = async () => {
  try {
    await db.sequelize.sync();
    await seed();
  } catch (error) {
    throw error;
  }
};

sync();
