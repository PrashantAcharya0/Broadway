import express from "express";
import { printPink } from "./utlis/color.console.js";
import connectDB from "./database-connection/connect.db.js";
import adminRoutes from "./admin/admin.controller.js";
import courseRoutes from "./course/course.controller.js";
const app = express();

// to make app understand jason
app.use(express.json());

// database connection
connectDB();

// register routes
app.use(adminRoutes);
app.use(courseRoutes);

// network port and server

const PORT = 8000;

app.listen(PORT, () => {
  console.log(printPink(`App is listening on port ${PORT}`));
});
