import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import {
  WellnessActivityAttributes,
  WellnessActivityInstance,
} from './interfaces/WellnessActivity/WellnessActivity';

export const WellnessActivityFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes,
): Sequelize.Model<WellnessActivityInstance, WellnessActivityAttributes> => {
  const attributes: SequelizeAttributes<WellnessActivityAttributes> = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timesPerWeek: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  };

  const WellnessActivity = sequelize.define<
    WellnessActivityInstance,
    WellnessActivityAttributes
  >('WellnessActivity', attributes);

  WellnessActivity.associate = (models) => {
    WellnessActivity.belongsToMany(models.User, {
      through: 'FavoriteUserWellnessActivities',
      as: 'usersWellnessActivities',
    });
    WellnessActivity.belongsToMany(models.Sickness, {
      through: 'SicknessWellnessActivities',
      as: 'sicknessesWellnessActivities',
    });
  };

  return WellnessActivity;
};
