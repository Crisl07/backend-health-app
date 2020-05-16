import { Router } from 'express';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../database/db';
import { sign } from 'jsonwebtoken';
import smtpTransport from '../utils/mailer';
import { verifyResetPasswordToken } from './middlewares/verifyResetPasswordToken';

export const declareAuthRoutes = (router: Router) => {
  router.post('/signup', async (req: Request, res: Response) => {
    console.log(req.body);
    if (!req.body.name || !req.body.email || !req.body.password) {
      res.status(400).send('Every field is required');
    } else {
      try {
        const newUser = await db.User.findOne({
          where: {
            email: req.body.email.toLowerCase(),
          },
        });
        if (!newUser) {
          req.body.password = bcrypt.hashSync(req.body.password, 10);
          db.User.create(req.body).then(() => {
            res.status(201).send('User was created succesfully');
          });
        } else {
          res.status(400).send('The account already exists');
        }
      } catch (error) {
        res.status(500).send('Something went wrong');
      }
    }
  });

  router.post('/login', async (req, res) => {
    if (!req.body) res.status(400).send('Please send an email');
    try {
      const user = await db.User.findOne({
        where: {
          email: req.body.email.toLowerCase(),
        },
      });
      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        res.status(400).send('Email or password are not valid');
      } else {
        delete user.password;
        let token = sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '15m',
        });
        res.json({ userId: user.id, avatar: user.avatar, token });
      }
    } catch (error) {
      res.status(500).send('Something went wrong');
    }
  });

  router.post(
    '/auth/reset_password',
    verifyResetPasswordToken,
    async (req: Request, res: Response) => {
      const user = req['user'];
      if (!user) res.status(400).send("user doesn't exist");
      if (req.body.newPassword === req.body.verifyPassword) {
        user.password = bcrypt.hashSync(req.body.newPassword, 10);
        try {
          await db.User.update(user, {
            where: { id: user.id },
          });
          const html = {
            to: user.email,
            from: process.env.MAILER_EMAIL_ID,
            template: 'reset-password-email',
            subject: 'Password Reset Confirmation',
            context: {
              name: user.name,
            },
          };
          smtpTransport.sendMail(html, function (err) {
            if (!err) {
              return res.status(200).send('Password was reseted successfully');
            } else {
              return res.status(500).send('Something went wrong');
            }
          });
        } catch (error) {
          res.status(500).send('Something went wrong');
        }
      } else {
        res.status(422).send('Passwords do not match');
      }
    },
  );

  router.post('/auth/forgot_password', async (req: Request, res: Response) => {
    if (!req.body) res.status(400).send('Please send an email');
    try {
      const user = await db.User.findOne({
        where: {
          email: req.body.email.toLowerCase(),
        },
      });
      if (!user) res.status(400).send("user doesn't exist");
      let token = sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
      });
      let data = {
        to: user.email,
        from: process.env.MAILER_EMAIL_ID,
        template: 'forgot-password-email',
        subject: 'Password help has arrived!',
        context: {
          url:
            process.env.FRONT_END_URL + '/auth/reset_password?token=' + token,
          name: user.name,
        },
      };
      smtpTransport.sendMail(data, function (err) {
        if (!err) {
          return res
            .status(200)
            .send('Kindly check your email for further instructions');
        } else {
          console.log(err);
          return res.status(422).send(err);
        }
      });
    } catch (error) {
      res.status(422).send(error);
    }
  });
};
