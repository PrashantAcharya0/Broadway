import mongoose from "mongoose";

// set schema/structure/rule
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
    unique: true, // 11000 error :Duplicate
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
});

// create table/model/collection
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
