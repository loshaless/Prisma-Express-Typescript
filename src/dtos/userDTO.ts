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

export interface LoginResponseDTO {
  token: string;
  email: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}
