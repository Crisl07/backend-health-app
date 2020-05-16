import { Router } from 'express';
import { Request, Response } from 'express';
import { db } from '../database/db';
import { authenticateUser } from './middlewares/authentication';

export const declareSicknessRoutes = (router: Router) => {
  router.get(
    '/sicknesses',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        const sicknesses = await db.Sickness.findAll({
          order: ['name'],
        });
        res.status(200).send(sicknesses);
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );

  router.post(
    '/sicknesses',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        await db.Sickness.create(req.body);
        res.status(201).send(`${req.body.name} was created successfully!`);
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );

  router.delete(
    '/sicknesses/:id',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        await db.Sickness.destroy({
          where: { id: req.params.id },
        });
        res.status(200).send(`sickness was deleted successfully!`);
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );

  router.get(
    '/sicknesses/:id/wellnessActivities',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        const sickness = await db.Sickness.findById(req.params.id);
        const sicknessWellnessActivities = await sickness.getWellnessActivities();
        res.status(200).send(sicknessWellnessActivities);
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );
};
