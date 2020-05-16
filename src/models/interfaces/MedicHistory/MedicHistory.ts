import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from '../User/User';
import { SicknessAttributes, SicknessInstance } from '../Sickness/Sickness';
import { DoctorAttributes, DoctorInstance } from '../Doctor/Doctor';

export interface MedicHistoryAttributes {
  id?: number;
  medicalAppointmentDate: Date;
  description: string;
  users?: UserAttributes[] | UserAttributes['id'][];
  sicknesses?: SicknessAttributes[] | SicknessAttributes['id'][];
  doctors?: DoctorAttributes[] | DoctorAttributes['id'][];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MedicHistoryInstance
  extends Sequelize.Instance<MedicHistoryAttributes>,
    MedicHistoryAttributes {
  getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setUser: Sequelize.BelongsToSetAssociationMixin<
    UserInstance,
    UserInstance['id']
  >;
  createUser: Sequelize.BelongsToCreateAssociationMixin<
    UserAttributes,
    UserInstance
  >;

  getSickness: Sequelize.BelongsToGetAssociationMixin<SicknessInstance>;
  setSickness: Sequelize.BelongsToSetAssociationMixin<
    SicknessInstance,
    SicknessInstance['id']
  >;
  createSickness: Sequelize.BelongsToCreateAssociationMixin<
    SicknessAttributes,
    SicknessInstance
  >;

  getDoctor: Sequelize.BelongsToGetAssociationMixin<DoctorInstance>;
  setDoctor: Sequelize.BelongsToSetAssociationMixin<
    DoctorInstance,
    DoctorInstance['id']
  >;
  createDoctor: Sequelize.BelongsToCreateAssociationMixin<
    DoctorAttributes,
    DoctorInstance
  >;
}
