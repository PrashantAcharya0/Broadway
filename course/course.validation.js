import Yup from "yup";

export const addCourseValidationSchema = Yup.object({
  name: Yup.string().required().max(60).trim(),
  price: Yup.number().required().min(0),
  duration: Yup.number().required().min(1),
});
