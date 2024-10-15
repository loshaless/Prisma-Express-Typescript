export interface CreateUserDTO {
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  email?: string;
  password?: string;
}