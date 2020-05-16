import * as Sequelize from 'sequelize';
import { SicknessAttributes, SicknessInstance } from '../Sickness/Sickness';
import {
  WellnessActivityAttributes,
  WellnessActivityInstance,
} from '../WellnessActivity/WellnessActivity';
import {
  MedicHistoryAttributes,
  MedicHistoryInstance,
} from '../MedicHistory/MedicHistory';

export interface UserAttributes {
  id?: number;
  name: string;
  avatar: string;
  email: string;
  password: string;
  age: number;
  genre: string;
  address: string;
  medicHistories?: MedicHistoryAttributes[] | MedicHistoryAttributes['id'][];
  contractedSicknesses?: SicknessAttributes[] | SicknessAttributes['id'][];
  favoriteWellnessActivities?:
    | WellnessActivityAttributes[]
    | WellnessActivityAttributes['id'];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInstance
  extends Sequelize.Instance<UserAttributes>,
    UserAttributes {
  getMedicHistories: Sequelize.HasManyGetAssociationsMixin<
    MedicHistoryInstance
  >;
  setMedicHistories: Sequelize.HasManySetAssociationsMixin<
    MedicHistoryInstance,
    MedicHistoryInstance['id']
  >;
  addMedicHistories: Sequelize.HasManyAddAssociationsMixin<
    MedicHistoryInstance,
    MedicHistoryInstance['id']
  >;
  addMedicHistory: Sequelize.HasManyAddAssociationMixin<
    MedicHistoryInstance,
    MedicHistoryInstance['id']
  >;
  createMedicHistory: Sequelize.HasManyCreateAssociationMixin<
    MedicHistoryAttributes,
    MedicHistoryInstance
  >;
  removeMedicHistory: Sequelize.HasManyRemoveAssociationMixin<
    MedicHistoryInstance,
    MedicHistoryInstance['id']
  >;
  removeMedicHistories: Sequelize.HasManyRemoveAssociationsMixin<
    MedicHistoryInstance,
    MedicHistoryInstance['id']
  >;
  hasMedicHistory: Sequelize.HasManyHasAssociationMixin<
    MedicHistoryInstance,
    MedicHistoryInstance['id']
  >;
  hasMedicHistories: Sequelize.HasManyHasAssociationsMixin<
    MedicHistoryInstance,
    MedicHistoryInstance['id']
  >;
  countMedicHistories: Sequelize.HasManyCountAssociationsMixin;

  getContractedSicknesses: Sequelize.BelongsToManyGetAssociationsMixin<
    SicknessInstance
  >;
  setContractedSicknesses: Sequelize.BelongsToManySetAssociationsMixin<
    SicknessInstance,
    SicknessInstance['id'],
    'UserSicknesses'
  >;
  addContractedSicknesses: Sequelize.BelongsToManyAddAssociationsMixin<
    SicknessInstance,
    SicknessInstance['id'],
    'UserSicknesses'
  >;
  addContractedSickness: Sequelize.BelongsToManyAddAssociationMixin<
    SicknessInstance,
    SicknessInstance['id'],
    'UserSicknesses'
  >;
  createContractedSicknesses: Sequelize.BelongsToManyCreateAssociationMixin<
    SicknessAttributes,
    SicknessInstance['id'],
    'UserSicknesses'
  >;
  removeContractedSickness: Sequelize.BelongsToManyRemoveAssociationMixin<
    SicknessInstance,
    SicknessInstance['id']
  >;
  removeContractedSicknesses: Sequelize.BelongsToManyRemoveAssociationsMixin<
    SicknessInstance,
    SicknessInstance['id']
  >;
  hasContractedSickness: Sequelize.BelongsToManyHasAssociationMixin<
    SicknessInstance,
    SicknessInstance['id']
  >;
  hasContractedSicknesses: Sequelize.BelongsToManyHasAssociationsMixin<
    SicknessInstance,
    SicknessInstance['id']
  >;
  countContractedSicknesses: Sequelize.BelongsToManyCountAssociationsMixin;

  getFavoriteWellnessActivities: Sequelize.BelongsToManyGetAssociationsMixin<
    WellnessActivityInstance
  >;
  setFavoriteWellnessActivities: Sequelize.BelongsToManySetAssociationsMixin<
    WellnessActivityInstance,
    WellnessActivityInstance['id'],
    'FavoriteUserWellnessActivities'
  >;
  addFavoriteWellnessActivities: Sequelize.BelongsToManyAddAssociationsMixin<
    WellnessActivityInstance,
    WellnessActivityInstance['id'],
    'FavoriteUserWellnessActivities'
  >;
  addFavoriteWellnessActivity: Sequelize.BelongsToManyAddAssociationMixin<
    WellnessActivityInstance,
    WellnessActivityInstance['id'],
    'FavoriteUserWellnessActivities'
  >;
  createFavoriteWellnessActivities: Sequelize.BelongsToManyCreateAssociationMixin<
    WellnessActivityAttributes,
    WellnessActivityInstance['id'],
    'FavoriteUserWellnessActivities'
  >;
  removeFavoriteWellnessActivity: Sequelize.BelongsToManyRemoveAssociationMixin<
    WellnessActivityInstance,
    WellnessActivityInstance['id']
  >;
  removeFavoriteWellnessActivities: Sequelize.BelongsToManyRemoveAssociationsMixin<
    WellnessActivityInstance,
    WellnessActivityInstance['id']
  >;
  hasFavoriteWellnessActivity: Sequelize.BelongsToManyHasAssociationMixin<
    WellnessActivityInstance,
    WellnessActivityInstance['id']
  >;
  hasFavoriteWellnessActivities: Sequelize.BelongsToManyHasAssociationsMixin<
    WellnessActivityInstance,
    WellnessActivityInstance['id']
  >;
  countFavoriteWellnessActivities: Sequelize.BelongsToManyCountAssociationsMixin;
}
