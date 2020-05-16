import * as Sequelize from 'sequelize';
import {
  MedicHistoryAttributes,
  MedicHistoryInstance,
} from '../MedicHistory/MedicHistory';

export interface DoctorAttributes {
  id?: number;
  name: string;
  medicalSpecialty: string;
  medicHistories?: MedicHistoryAttributes[] | MedicHistoryAttributes['id'][];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DoctorInstance
  extends Sequelize.Instance<DoctorAttributes>,
    DoctorAttributes {
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
}
