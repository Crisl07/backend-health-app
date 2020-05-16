import Sequelize from 'sequelize';
import { DbInterface } from 'models/interfaces/DbInterface/DbInterface';
import { DoctorFactory } from './Doctor';
import { MedicHistoryFactory } from './MedicHistory';
import { SicknessFactory } from './Sickness';
import { UserFactory } from './User';
import { WellnessActivityFactory } from './WellnessActivity';
import { SequelizeConfig } from '../config/sequelizeconfiginterface';
import { userData } from '../seed/user';

export const createModels = (sequelizeConfig: SequelizeConfig): DbInterface => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize(database, username, password, params);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize),
    Sickness: SicknessFactory(sequelize, Sequelize),
    MedicHistory: MedicHistoryFactory(sequelize, Sequelize),
    WellnessActivity: WellnessActivityFactory(sequelize, Sequelize),
    Doctor: DoctorFactory(sequelize, Sequelize),
  };

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};
