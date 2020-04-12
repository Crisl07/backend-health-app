import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import { MedicHistoryAttributes, MedicHistoryInstance } from "./interfaces/MedicHistory/MedicHistory";

export const MedicHistoryFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<MedicHistoryInstance, MedicHistoryAttributes> => {
  const attributes: SequelizeAttributes<MedicHistoryAttributes> = {
    medicalAppointmentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  };

  const MedicHistory = sequelize.define<MedicHistoryInstance, MedicHistoryAttributes>('MedicHistory', attributes);

  MedicHistory.associate = models => {
    MedicHistory.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    MedicHistory.belongsTo(models.Sickness, { as: 'sickness', foreignKey: 'sicknessId' });
    MedicHistory.belongsTo(models.Doctor, { as: 'doctor', foreignKey: 'doctorId' });
  };

  return MedicHistory;
};
