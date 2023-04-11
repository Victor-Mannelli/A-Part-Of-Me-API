import joi from 'joi';

export const signInSchema = joi.object({
  login: joi.string().min(3).required(),
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

export const messageSchema = joi.object({
  message: joi.string().required()
});
export const messageReceiverSchema = joi.object({
  receiverId: joi.number().required()
});
export const messageAuthorSchema = joi.object({
  authorId: joi.number().required()
});
export const friendRequestId = joi.object({
  friend_id: joi.number().required()
});
