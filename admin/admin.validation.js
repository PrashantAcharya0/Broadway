import Yup from "yup";

export const registerAdminValidationSchema = Yup.object({
  email: Yup.string().trim().required().max(55).email().lowercase(),
  password: Yup.string().trim().required().min(4).max(30),
  firstName: Yup.string().trim().required().max(30).lowercase(),
  lastName: Yup.string().trim().required().max(30).lowercase(),
});

export const loginAdminValidationSchema = Yup.object({
  email: Yup.string().trim().required().email().lowercase(),
  password: Yup.string().trim().required(),
});
