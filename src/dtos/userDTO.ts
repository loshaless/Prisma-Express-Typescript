export interface CreateUserRequestDTO {
  email: string;
  password: string;
}

export interface CreateUserResponseDTO {
  email: string;
}

export interface UpdateUserDTO {
  email?: string;
  password?: string;
}