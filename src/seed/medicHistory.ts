import { UserInstance } from "models/interfaces/User/User";
import { SicknessInstance } from "models/interfaces/Sickness/Sickness";
import { DoctorInstance } from "models/interfaces/Doctor/Doctor";
import { db } from "../database/db";

export const createMedicHistories = async (users: UserInstance[], sicknesses: SicknessInstance[], doctors: DoctorInstance[]) => {
  let i = 0;
  while (i < users.length && i < sicknesses.length && i < doctors.length) {
    const medicHistoryData: any = {
      id: i + 1,
      medicalAppointmentDate: new Date(),
      description: "Se le mando crema",
      userId: users[i].id,
      sicknessId: sicknesses[i].id,
      doctorId: doctors[i].id
    }

    await db.MedicHistory.create(medicHistoryData, {
      include: [{
        model: db.User,
        as: 'user'
      }, {
        model: db.Sickness,
        as: 'sickness'
      }, {
        model: db.Doctor,
        as: 'doctor'
      }]
    });

    const medicHistory = await db.MedicHistory.findByPk(medicHistoryData.id);
    medicHistory.setAttributes("users", users);
    medicHistory.setAttributes("sicknesses", sicknesses);
    medicHistory.setAttributes("doctors", doctors);
    i++;
  }
}