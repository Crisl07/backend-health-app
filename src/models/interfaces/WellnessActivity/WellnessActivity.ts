import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from '../User/User';
import { SicknessAttributes, SicknessInstance } from '../Sickness/Sickness';

export interface WellnessActivityAttributes {
  id?: number;
  name: string;
  description: string;
  duration: string;
  timesPerWeek: number;
  usersWellnessActivities?: UserAttributes[] | UserAttributes['id'][];
  sicknessesWellnessActivities?:
    | SicknessAttributes[]
    | SicknessAttributes['id'][];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WellnessActivityInstance
  extends Sequelize.Instance<WellnessActivityAttributes>,
    WellnessActivityAttributes {
  getUsersWellnessActivities: Sequelize.BelongsToManyGetAssociationsMixin<
    UserInstance
  >;
  setUsersWellnessActivities: Sequelize.BelongsToManySetAssociationsMixin<
    UserInstance,
    UserInstance['id'],
    'FavoriteUserWellnessActivities'
  >;
  addUsersWellnessActivities: Sequelize.BelongsToManyAddAssociationsMixin<
    UserInstance,
    UserInstance['id'],
    'FavoriteUserWellnessActivities'
  >;
  addUsersWellnessActivity: Sequelize.BelongsToManyAddAssociationMixin<
    UserInstance,
    UserInstance['id'],
    'FavoriteUserWellnessActivities'
  >;
  createUsersWellnessActivities: Sequelize.BelongsToManyCreateAssociationMixin<
    UserAttributes,
    UserInstance['id'],
    'FavoriteUserWellnessActivities'
  >;
  removeUsersWellnessActivity: Sequelize.BelongsToManyRemoveAssociationMixin<
    UserInstance,
    UserInstance['id']
  >;
  removeUsersWellnessActivities: Sequelize.BelongsToManyRemoveAssociationsMixin<
    UserInstance,
    UserInstance['id']
  >;
  hasUsersWellnessActivity: Sequelize.BelongsToManyHasAssociationMixin<
    UserInstance,
    UserInstance['id']
  >;
  hasUsersWellnessActivities: Sequelize.BelongsToManyHasAssociationsMixin<
    UserInstance,
    UserInstance['id']
  >;
  countUsersWellnessActivities: Sequelize.BelongsToManyCountAssociationsMixin;

  getSicknessesWellnessActivities: Sequelize.BelongsToManyGetAssociationsMixin<
    SicknessInstance
  >;
  setSicknessesWellnessActivities: Sequelize.BelongsToManySetAssociationsMixin<
    SicknessInstance,
    SicknessInstance['id'],
    'SicknessWellnessActivities'
  >;
  addSicknessesWellnessActivities: Sequelize.BelongsToManyAddAssociationsMixin<
    SicknessInstance,
    SicknessInstance['id'],
    'SicknessWellnessActivities'
  >;
  addSicknessesWellnessActivity: Sequelize.BelongsToManyAddAssociationMixin<
    SicknessInstance,
    SicknessInstance['id'],
    'SicknessWellnessActivities'
  >;
  createSicknessesWellnessActivities: Sequelize.BelongsToManyCreateAssociationMixin<
    SicknessAttributes,
    SicknessInstance['id'],
    'SicknessWellnessActivities'
  >;
  removeSicknessesWellnessActivity: Sequelize.BelongsToManyRemoveAssociationMixin<
    SicknessInstance,
    SicknessInstance['id']
  >;
  removeSicknessesWellnessActivities: Sequelize.BelongsToManyRemoveAssociationsMixin<
    SicknessInstance,
    SicknessInstance['id']
  >;
  hasSicknessesWellnessActivity: Sequelize.BelongsToManyHasAssociationMixin<
    SicknessInstance,
    SicknessInstance['id']
  >;
  hasSicknessesWellnessActivities: Sequelize.BelongsToManyHasAssociationsMixin<
    SicknessInstance,
    SicknessInstance['id']
  >;
  countSicknessesWellnessActivities: Sequelize.BelongsToManyCountAssociationsMixin;
}
