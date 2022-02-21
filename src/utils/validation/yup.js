import * as yup from "yup";

export const LoginAccountSchema = yup
  .object({
    username: yup.string("user name must be a string").required(),
    password: yup
      .string()
      .min(8, "password must be at least 8 character.")
      .max(10, "max length is 10")
      .required(),
    checkbox: yup.boolean().required(),
  })
  .required();

export const SignAccountSchema = yup
  .object({
    username: yup.string("user name must be a string").required(),
    email: yup
      .string("email must be a string")
      .email("Invalid email format")
      .required()
      .trim(),
    password: yup
      .string()
      .min(8, "password must be at least 8 character.")
      .max(10, "max length is 10")
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{9}$/, "Phone number is not valid"),
     // .required(),
      country: yup
      .string(),
      //.required(),
    agreement: yup
      .boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required("You must agree to the terms and conditions"),
  })
  .required();
