import * as Joi from 'joi';

/**
 * Validation schema for user login.
 * 
 * This schema validates the required fields for user login, including:
 * - `email`: A valid email address.
 * - `password`: A string with a minimum length of 5 characters.
 */
export const loginSchema = Joi.object({
  /**
   * Email field validation:
   * - Must be a valid email format.
   * - Required field.
   * - Custom error messages for invalid email format or missing value.
   */
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address.',
      'any.required': 'Email is required.',
    }),

  /**
   * Password field validation:
   * - Must be at least 5 characters long.
   * - Required field.
   * - Custom error messages for minimum length or missing value.
   */
  password: Joi.string()
    .min(5)
    .required()
    .messages({
      'string.min': 'Password must be at least 5 characters long.',
      'any.required': 'Password is required.',
    }),
});
