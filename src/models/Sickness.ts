import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import { SicknessAttributes, SicknessInstance } from "./interfaces/Sickness/Sickness";

export const SicknessFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<SicknessInstance, SicknessAttributes> => {
  const attributes: SequelizeAttributes<SicknessAttributes> = {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scientificNotation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  };

  const Sickness = sequelize.define<SicknessInstance, SicknessAttributes>('Sickness', attributes);

  Sickness.associate = models => {
    Sickness.hasMany(models.MedicHistory, { foreignKey: "sicknessId", as: 'medicHistories' });
    Sickness.belongsToMany(models.User, {
      through: 'UserSicknesses',
      as: 'sickPeople'
    });
    Sickness.belongsToMany(models.WellnessActivity, {
      through: 'SicknessWellnessActivities',
      as: 'wellnessActivities'
    });
  };

  return Sickness;
};
