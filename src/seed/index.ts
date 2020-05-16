import { db } from '../database/db';
import { userData } from '../seed/user';
import { wellnessPlanData } from '../seed/wellnessPlan';
import { sicknessesData } from '../seed/sicknesses';
import { createMedicHistories } from '../seed/medicHistory';
import { doctorData } from '../seed/doctor';

export const seed = async () => {
  await db.User.bulkCreate(userData);
  await db.WellnessActivity.bulkCreate(wellnessPlanData);
  await db.Sickness.bulkCreate(sicknessesData);
  await db.Doctor.bulkCreate(doctorData);
  const users = await db.User.findAll();
  const doctors = await db.Doctor.findAll();
  const sicknesses = await db.Sickness.findAll();
  const wellnessActivities = await db.WellnessActivity.findAll();
  sicknesses.forEach((sickness) => {
    wellnessActivities.forEach(async (activity) => {
      await sickness.addWellnessActivity(activity.id);
    });
  });
  await createMedicHistories(users, sicknesses, doctors);
};
