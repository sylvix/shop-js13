export interface User {
  _id: string,
  email: string,
  token: string,
}

export interface RegisterUserData {
  email: string,
  password: string
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    password: FieldError,
    email: FieldError
  }
}
