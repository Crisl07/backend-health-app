import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import { DoctorAttributes, DoctorInstance } from './interfaces/Doctor/Doctor';

export const DoctorFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes,
): Sequelize.Model<DoctorInstance, DoctorAttributes> => {
  const attributes: SequelizeAttributes<DoctorAttributes> = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medicalSpecialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  const Doctor = sequelize.define<DoctorInstance, DoctorAttributes>(
    'Doctor',
    attributes,
  );

  Doctor.associate = (models) => {
    Doctor.hasMany(models.MedicHistory, {
      foreignKey: 'doctorId',
      as: 'medicHistories',
    });
  };

  return Doctor;
};
