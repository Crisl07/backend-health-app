import { Router } from 'express';
import { Request, Response } from 'express';
import { db } from '../database/db';
import { authenticateUser } from './middlewares/authentication';
import bcrypt from 'bcrypt';

export const declareUserRoutes = async (router: Router) => {
  router.get(
    '/users/:id',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        const user = await db.User.findById(req.params.id);
        const userInfo = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          age: user.age,
          genre: user.genre,
          address: user.address,
        };
        res.status(200).send(userInfo);
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );

  router.put(
    '/users/:id',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        if (!req.body.name) delete req.body.name;
        if (!req.body.email) delete req.body.email;
        if (!req.body.age) delete req.body.age;
        !req.body.password
          ? delete req.body.password
          : (req.body.password = bcrypt.hashSync(req.body.password, 10));
        await db.User.update(req.body, {
          where: { id: req.params.id },
        });
        res.status(200).send('The changes were done successfully');
      } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
      }
    },
  );

  router.get(
    '/users/:id/sicknesses',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        const user = await db.User.findById(req.params.id);
        const userSicknesses = await user.getContractedSicknesses();
        res.status(200).send(userSicknesses);
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );

  router.post(
    '/users/:userId/sicknesses/:sicknessId',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        const user = await db.User.findById(req.params.userId);
        await user.addContractedSickness(+req.params.sicknessId);
        res.status(200).send('Sickness was added successfully');
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );

  router.delete(
    '/users/:userId/sicknesses/:sicknessId',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        const user = await db.User.findById(req.params.userId);
        await user.removeContractedSickness(+req.params.sicknessId);
        res.status(200).send('Sickness was deleted successfully!');
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );

  router.get(
    '/users/:id/wellnessActivities',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        const user = await db.User.findById(req.params.id);
        const userWellnessActivities = await user.getFavoriteWellnessActivities();
        res.status(200).send(userWellnessActivities);
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );

  router.post(
    '/users/:userId/wellnessActivities/:wellnessActivityId',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        const user = await db.User.findById(req.params.userId);
        const hasActivity = await user.hasFavoriteWellnessActivity(
          +req.params.wellnessActivityId,
        );
        if (hasActivity) {
          res.status(400).send('This activity is already added as favorite');
        }
        await user.addFavoriteWellnessActivity(+req.params.wellnessActivityId);
        res
          .status(200)
          .send('Wellness activity was added as favorite successfully!');
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );

  router.delete(
    '/users/:userId/wellnessActivities/:wellnessActivityId',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        const user = await db.User.findById(req.params.userId);
        await user.removeFavoriteWellnessActivity(
          +req.params.wellnessActivityId,
        );
        res.status(200).send('Wellness activity was deleted successfully!');
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );

  router.get(
    '/users/:userId/sicknesses/:sicknessId/favoriteWellnessActivities',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        const wellnessActivities = await db.WellnessActivity.findAll({
          include: [
            {
              model: db.User,
              as: 'usersWellnessActivities',
              where: { id: req.params.userId },
            },
            {
              model: db.Sickness,
              as: 'sicknessesWellnessActivities',
              where: { id: req.params.sicknessId },
            },
          ],
        });
        res.status(200).send(wellnessActivities);
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );

  router.get(
    '/users/:userId/sicknesses/:sicknessId/wellnessActivities',
    async (req: Request, res: Response) => {
      try {
        const wellnessActivities = await db.WellnessActivity.findAll({
          include: [
            {
              model: db.User,
              as: 'usersWellnessActivities',
              where: { id: !req.params.userId },
            },
            {
              model: db.Sickness,
              as: 'sicknessesWellnessActivities',
              where: { id: req.params.sicknessId },
            },
          ],
        });
        res.status(200).send(wellnessActivities);
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );

  router.get(
    '/users/:id/medicHistories',
    authenticateUser,
    async (req: Request, res: Response) => {
      try {
        const medicHistories = await db.MedicHistory.findAll({
          include: [
            {
              model: db.User,
              as: 'user',
              where: { id: req.params.id },
            },
            {
              model: db.Sickness,
              as: 'sickness',
            },
            {
              model: db.Doctor,
              as: 'doctor',
            },
          ],
        });
        res.status(200).send(medicHistories);
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    },
  );
};
