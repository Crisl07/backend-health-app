import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from "../User/User";
import { MedicHistoryAttributes, MedicHistoryInstance } from "../MedicHistory/MedicHistory";
import { WellnessActivityAttributes, WellnessActivityInstance } from "../WellnessActivity/WellnessActivity";

export interface SicknessAttributes {
  id?: number;
  name: string;
  scientificNotation: string;
  img: string;
  description: string;
  sickPeople?: UserAttributes[] | UserAttributes['id'][];
  medicHistories?: MedicHistoryAttributes[] | MedicHistoryAttributes['id'][];
  wellnessActivities?: WellnessActivityAttributes[] | WellnessActivityAttributes['id'][];
  createdAt?: Date;
  updatedAt?: Date;
};

export interface SicknessInstance extends Sequelize.Instance<SicknessAttributes>, SicknessAttributes {
  getMedicHistories: Sequelize.HasManyGetAssociationsMixin<MedicHistoryInstance>;
  setMedicHistories: Sequelize.HasManySetAssociationsMixin<MedicHistoryInstance, MedicHistoryInstance['id']>;
  addMedicHistories: Sequelize.HasManyAddAssociationsMixin<MedicHistoryInstance, MedicHistoryInstance['id']>;
  addMedicHistory: Sequelize.HasManyAddAssociationMixin<MedicHistoryInstance, MedicHistoryInstance['id']>;
  createMedicHistory: Sequelize.HasManyCreateAssociationMixin<MedicHistoryAttributes, MedicHistoryInstance>;
  removeMedicHistory: Sequelize.HasManyRemoveAssociationMixin<MedicHistoryInstance, MedicHistoryInstance['id']>;
  removeMedicHistories: Sequelize.HasManyRemoveAssociationsMixin<MedicHistoryInstance, MedicHistoryInstance['id']>;
  hasMedicHistory: Sequelize.HasManyHasAssociationMixin<MedicHistoryInstance, MedicHistoryInstance['id']>;
  hasMedicHistories: Sequelize.HasManyHasAssociationsMixin<MedicHistoryInstance, MedicHistoryInstance['id']>;
  countMedicHistories: Sequelize.HasManyCountAssociationsMixin;

  getSickPeople: Sequelize.BelongsToManyGetAssociationsMixin<UserInstance>;
  setSickPeople: Sequelize.BelongsToManySetAssociationsMixin<UserInstance, UserInstance['id'], 'UserSicknesses'>;
  addSickPeople: Sequelize.BelongsToManyAddAssociationsMixin<UserInstance, UserInstance['id'], 'UserSicknesses'>;
  addSickPerson: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], 'UserSicknesses'>;
  createSickPeople: Sequelize.BelongsToManyCreateAssociationMixin<UserAttributes, UserInstance['id'], 'UserSicknesses'>;
  removeSickPerson: Sequelize.BelongsToManyRemoveAssociationMixin<UserInstance, UserInstance['id']>;
  removeSickPeople: Sequelize.BelongsToManyRemoveAssociationsMixin<UserInstance, UserInstance['id']>;
  hasSickPerson: Sequelize.BelongsToManyHasAssociationMixin<UserInstance, UserInstance['id']>;
  hasSickPeople: Sequelize.BelongsToManyHasAssociationsMixin<UserInstance, UserInstance['id']>;
  countSickPeople: Sequelize.BelongsToManyCountAssociationsMixin;

  getWellnessActivities: Sequelize.BelongsToManyGetAssociationsMixin<WellnessActivityInstance>;
  setWellnessActivities: Sequelize.BelongsToManySetAssociationsMixin<WellnessActivityInstance, WellnessActivityInstance['id'], 'SicknessWellnessActivities'>;
  addWellnessActivities: Sequelize.BelongsToManyAddAssociationsMixin<WellnessActivityInstance, WellnessActivityInstance['id'], 'SicknessWellnessActivities'>;
  addWellnessActivity: Sequelize.BelongsToManyAddAssociationMixin<WellnessActivityInstance, WellnessActivityInstance['id'], 'SicknessWellnessActivities'>;
  createWellnessActivities: Sequelize.BelongsToManyCreateAssociationMixin<WellnessActivityAttributes, WellnessActivityInstance['id'], 'SicknessWellnessActivities'>;
  removeWellnessActivity: Sequelize.BelongsToManyRemoveAssociationMixin<WellnessActivityInstance, WellnessActivityInstance['id']>;
  removeWellnessActivities: Sequelize.BelongsToManyRemoveAssociationsMixin<WellnessActivityInstance, WellnessActivityInstance['id']>;
  hasWellnessActivity: Sequelize.BelongsToManyHasAssociationMixin<WellnessActivityInstance, WellnessActivityInstance['id']>;
  hasWellnessActivities: Sequelize.BelongsToManyHasAssociationsMixin<WellnessActivityInstance, WellnessActivityInstance['id']>;
  countWellnessActivities: Sequelize.BelongsToManyCountAssociationsMixin;
};