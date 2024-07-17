import express from "express";
import Yup from "yup";
import {
  registerAdminValidationSchema,
  loginAdminValidationSchema,
} from "./admin.validation.js";
import bcrypt from "bcrypt";
import Admin from "./admin.model.js";
import validateReqBody from "../middlewares/validation.milddleware.js";

const router = express.Router();

// register Router
router.post(
  "/admin/register",
  validateReqBody(registerAdminValidationSchema), //function

  async (req, res) => {
    // extract new admin from req.body
    const newAdmin = req.body;

    // find admin using provided email
    const admin = await Admin.findOne({ email: newAdmin.email });

    // if admin exist, throw error
    if (admin) {
      return res.status(200).send({ message: "Admin already exists." });
    }

    // generate hased password
    const plainPassword = newAdmin.Password;
    const salRound = 10; // increase randomness
    const hashedPassword = await bcrypt.hash(plainPassword, salRound);

    newAdmin.Password = hashedPassword;
    await Admin.create(newAdmin);

    return res.status(200).send({ message: "Register..." });
  }
);

// * login admin

router.get(
  "/admin/login",
  validateReqBody(loginAdminValidationSchema),
  async (req, res) => {
    // extract login credentials from req.body
    const loginCredentials = req.body;

    //find admin using email
    const admin = await Admin.findOne({ email: loginCredentials.email });

    // if not admin found, throw error
    if (!admin) {
      return res.status(404).send({ message: "Invalid Credentials." });
    }

    // check fro password match
    const plainPassword = loginCredentials.Password;
    const hashedPassword = admin.password;
    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

    // if not password match, throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid Credentials" });
    }

    // hide password
    admin.password = undefined;

    // generate access token
    const payload = { email: admin.email };

    const token = jwt.sign(payload, "asdfghjkl");

    // send res
    return res.status(400).send({ message: "Sucess", adminDetail: admin });
  }
);
export default router;
