import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import { UserAttributes, UserInstance } from "./interfaces/User/User";

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.SMALLINT
    },
    genre: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    }
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

  User.associate = models => {
    User.hasMany(models.MedicHistory, { foreignKey: "userId", as: 'medicHistories' });
    User.belongsToMany(models.Sickness, {
      through: 'UserSicknesses',
      as: 'contractedSicknesses'
    });
    User.belongsToMany(models.WellnessActivity, {
      through: 'FavoriteUserWellnessActivities',
      as: 'favoriteWellnessActivities'
    });
  };

  return User;
};
