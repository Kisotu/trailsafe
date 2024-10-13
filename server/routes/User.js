import express from "express";
import bcrypt from "bcrypt";

//User
import { User } from "../models/User.js";

const router = express.Router();

// signup
router.post("/signup", (req, res) => {
  let { name, email, password } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();

  if (name == "" || email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty input filed!",
    });
  } else if (!/^[a-zA-Z\s]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name entered!",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid email entered!",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Paswword is too short!",
    });
  } else {
    //check if user exists
    User.find({ email })
      .then((result) => {
        if (result.length) {
          res.json({
            status: "FAILED",
            message: "User with provided email already exists!",
          });
        } else {
          //try to create User && password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                name,
                email,
                password: hashedPassword,
              });

              newUser.save().then((result) => {
                res.json({
                  status: "SUCCESS",
                  message: "Signup successful!",
                  data: result,
                });
              });
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "Error occured while hashing password!",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "Error occured  while checking for existing user",
        });
      });
  }
});

//signin
router.post("/signin", (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied",
    });
  } else {
    User.find({ email }).then((data) => {
      if (data.length) {
        //user exists?
        const hashedPassword = data[0].password;
        bcrypt
          .compare(password, hashedPassword)
          .then((result) => {
            if (result) {
              //password matches?
              res.json({
                status: "SUCCESS",
                message: "Signin Successful",
                data: data,
              });
            } else {
              res.json({
                status: "FAILED",
                message: "Invalid password entered",
              });
            }
          })
          .catch((err) => {
            res.json({
              status: "FAILED",
              message: "Error occurred while comparing password",
            });
          });
      } else {
        res.json({
          status: "FAILED",
          message: "Invalid credentials",
        });
      }
    }).catch(err => {
		res.json({
			status: "FAILED",
			message: "User does not exist"
		})
	})
  }
});

export default router;
