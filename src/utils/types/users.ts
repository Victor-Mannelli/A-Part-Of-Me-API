export type RegistrationBody = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};
export type CreateNewUser = Omit<RegistrationBody, 'password' | 'confirmPassword'> & {
  hashedPassword: string;
};

export type LoginBody = {
  login: string;
  password: string;
};
export type Login = {
  userId: string;
  token: string;
};

export type ChangePasswordBody = {
  userId: string;
  newPassword: string;
};

export type ChangePassword = Omit<ChangePasswordBody, 'newPassword'> & {
  newHashedPassword: string;
};

export type JwtPayload = {
  user_id: string;
  username: string;
  email: string;
  avatar: string;
};
