import { number } from "zod";

export enum ERROR_CODE {
  INVALID_INPUT = 400,
  UNAUTHORIZED = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum SUCCESS_CODE {
  OK = 200,
  CREATED = 201,
}

export enum ERROR_MESSAGE {
  DB_CONNECTION = "error while trying to connect to database",
  SERVER_ERROR = "unexpected error",
  INVALID_INPUT = "invalid input",
  MISSING_AUTH_HEADER = "missing authorization header",
  INVALID_TOKEN_TYPE = "invalid token type",
  UNAUTHORIZED = "unauthorized access",

  FOOD_NOT_FOUND = "food not found",
  CATEGORY_NOT_FOUND = "category not found",
  CUSTOMER_NOT_FOUND = "user not found",
  ADMIN_NOT_FOUND = "admin not found",
  JOB_NOT_FOUND = "job not found",
  ORDER_NOT_FOUND = "order not found",
  STAFF_NOT_FOUND = "staff not found",

  INCORRECT_CREDENTIAL = "incorrect email or password",
  EMAIL_EXISTED = "email already existed",
  PHONE_EXISTED = "phone number already existed",
}

export enum SUCCESS_MESSAGE {
  REGISTERED = "registered successfully",
  LOGGEDIN = "logged in successfully",
  UPDATED = "updated successfully",
  DELETED = "deleted successfully",
  CREATED = "created successfully",
}
