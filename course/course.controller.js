import express from "express";
import { addCourseValidationSchema } from "./course.validation.js";
import validateReqBody from "../middlewares/validation.milddleware.js";
import jwt from "jsonwebtoken";
import Admin from "../admin/admin.model.js";
import Course from "./course.model.js";

const router = express.Router();

// * add course
router.post(
  "/course/add",
  validateReqBody(addCourseValidationSchema),
  async (req, res) => {
    // extract token from req.headers
    const authorization = req.headers.authorization;

    const splittedToken = authorization?.split(" ");

    const token = splittedToken?.length === 2 ? splittedToken[1] : null;
    // if not token ,throw error
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    // verify token
    let payload;
    try {
      const sign = "asdsafsfa";
      payload = jwt.verify(token, sign);
    } catch (error) {
      //if verificatioin fails ,throw error
      return res.status(401).send({ message: "Unauthorized." });
    }
    // find admin using payload
    const admin = await Admin.findOne({ email: payload.email });

    // if not admin ,throw error
    if (!admin) {
      return res.status(401).send({ message: "Unauthorized." });
    }
    req.loggedInUserId = admin._id;
    // call next function
    next();
  },
  async (req, res) => {
    // extract new course from req.body
    const newCourse = req.body;
    newCourse.addedBy = req.loggedInUserId;
    // add course
    await Course.create(newCourse);
    // send res
    return res.status(201).send("Adding...");
  }
);

// * get course list
router.get("/course/list", async (req, res, next) => {
  const courses = await Course.aggregate([
    {
      $match: {},
    },
    {
      $lookup: {
        from: "admin",
        localField: "addedBy",
        foreignField: "_id",
        as: "adminData",
      },
    },
    {
      $project: {
        name: 1,
        price: 1,
        duration: 1,
        adminEmail: { $first: "$adminData.email" },
      },
    },
  ]);

  // send res
  return res.status.send(201).send({ message: "sucess", courseList: courses });
});

export default router;
