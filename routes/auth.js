import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  securedWithAdminToken,
} from "../middlewares/jwt.js";
import express from "express";

const router = express.Router();

const index = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.json({ message: "error" });
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  // const email = req.body.email;
  // const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({ message: err });
        }
        if (result) {
          const hash = {
            id: user._id,
            role: user.role,
          };
          const accessToken = generateAccessToken(hash);

          res.status(200).send(
            JSON.stringify({
              //200 OK
              status: 200,
              message: "success",
              user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                gender: user.gender,
                email: user.email,
                password: user.password,
                phone: user.phone,
                avatar: user.avatar,
                verified: user.verified,
                role: user.role,
                token: accessToken,
              },
            })
          );
        } else {
          res.status(201).send(
            JSON.stringify({
              //201 password
              status: 201,
              message: "incorrect password",
            })
          );
        }
      });
    } else {
      res.status(404).send(
        JSON.stringify({
          //200 OK
          status: 404,
          message: "user not found",
        })
      );
    }
  });
};

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      console.log("erreur password hash");
      res.json({
        message: err,
      });
    }

    User.findOne({ $or: [{ email: req.body.email }] }).then((user) => {
      if (user) {
        //user found
        res.status(200).send(
          JSON.stringify({
            status: 201,
            message: "User exist",
          })
        );
      } else {
        //no user found
        let user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          gender: req.body.gender,
          email: req.body.email,
          password: hashedPass,
          phone: req.body.phone,
          role: "user",
          avatar: "",
          verified: 0,
        });
        user
          .save()
          .then((user) => {
            res.status(200).send(
              JSON.stringify({
                status: 200,
                message: "User Added Successfully!",
              })
            );
          })
          .catch((error) => {
            res.json({
              message: "An error occured when adding user!",
            });
          });
      } //end else
    }); //end then
  }); //end hash
};

router.get("/", securedWithAdminToken, index); //add security middleware

//authentification
router.post("/login", login); //email,password
router.post("/register", register);

export default router;
