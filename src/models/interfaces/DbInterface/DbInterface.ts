import * as Sequelize from 'sequelize';
import { UserInstance, UserAttributes } from 'models/interfaces/User/User';
import {
  DoctorInstance,
  DoctorAttributes,
} from 'models/interfaces/Doctor/Doctor';
import {
  MedicHistoryInstance,
  MedicHistoryAttributes,
} from 'models/interfaces/MedicHistory/MedicHistory';
import {
  SicknessInstance,
  SicknessAttributes,
} from 'models/interfaces/Sickness/Sickness';
import {
  WellnessActivityInstance,
  WellnessActivityAttributes,
} from 'models/interfaces/WellnessActivity/WellnessActivity';

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: Sequelize.Model<UserInstance, UserAttributes>;
  Sickness: Sequelize.Model<SicknessInstance, SicknessAttributes>;
  MedicHistory: Sequelize.Model<MedicHistoryInstance, MedicHistoryAttributes>;
  WellnessActivity: Sequelize.Model<
    WellnessActivityInstance,
    WellnessActivityAttributes
  >;
  Doctor: Sequelize.Model<DoctorInstance, DoctorAttributes>;
}
