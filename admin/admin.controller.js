import express from "express";
import Yup from "yup";
import registerAdminValidationSchema from "./admin.validation.js";
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

    return res.status(200).send({ message: "Regsister..." });
  }
);

export default router;
