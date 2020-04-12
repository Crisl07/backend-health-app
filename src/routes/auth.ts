import { Router } from 'express';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../database/db';
import { sign } from "jsonwebtoken";

export const declareAuthRoutes = (router: Router) => {
  router.post('/signup', async (req: Request, res: Response) => {
    console.log(req.body);
    if (!req.body.name || !req.body.email || !req.body.password) {
      res.status(400).send("Every field is required")
    } else {
      try {
        const newUser = await db.User.findOne({
          where: {
            email: req.body.email.toLowerCase()
          }
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

  router.post("/login", async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: req.body.email.toLowerCase()
        }
      })
      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        res.status(400).send("Email or password are not valid");
      } else {
        delete user.password;
        let token = sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        res.json({ userId: user.id, avatar: user.avatar, token });
      }
    } catch (error) {
      res.status(500).send('Something went wrong');
    }
  });
}
