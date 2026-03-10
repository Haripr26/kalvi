/**
 * MODEL — UserModel.js
 * Holds the shape of user data and pure validation/business logic.
 * No React, no UI concerns here.
 */

export const defaultUserFields = {
  firstName: "",
  email: "",
  password: "",
  confirm: "",
};

/**
 * Validate login / register fields.
 * @param {"login"|"register"} mode
 * @param {typeof defaultUserFields} fields
 * @param {boolean} agreed  - terms checkbox (register only)
 * @returns {Object} errors  - empty object means valid
 */
export function validateUser(mode, fields, agreed) {
  const errors = {};

  if (mode === "register" && !fields.firstName.trim()) {
    errors.firstName = "Name is required";
  }

  if (!fields.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email";
  }

  if (!fields.password) {
    errors.password = "Password is required";
  } else if (fields.password.length < 6) {
    errors.password = "Min 6 characters";
  }

  if (mode === "register") {
    if (!fields.confirm) {
      errors.confirm = "Please confirm your password";
    } else if (fields.password !== fields.confirm) {
      errors.confirm = "Passwords don't match";
    }
    if (!agreed) {
      errors.terms = "Please accept the terms";
    }
  }

  return errors;
}

/**
 * Simulate an async login / register API call.
 * Replace with a real fetch() in production.
 */
export async function submitAuth(mode, fields) {
  // Simulated network delay
  await new Promise((resolve) => setTimeout(resolve, 1600));
  return { success: true, mode, email: fields.email };
}
