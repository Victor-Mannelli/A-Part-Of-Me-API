import joi from 'joi';

export const signInSchema = joi.object({
  username: joi.string().min(3).required(),
  password: joi.string().min(6).required(),
});
export const signUpSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().min(3).required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.ref('password'),
});
export const changePasswordSchema = joi.object({
  password: joi.string().min(6).required()
});
