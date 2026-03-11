/**
 * Validation utilities for forms
 */

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic international format)
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

/**
 * Validate registration form
 */
export const validateRegistration = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone: string;
  fieldOfInterest: string;
}): { valid: boolean; errors: ValidationError[] } => {
  const errors: ValidationError[] = [];

  if (!formData.firstName.trim()) {
    errors.push({ field: "firstName", message: "First name is required" });
  }

  if (!formData.lastName.trim()) {
    errors.push({ field: "lastName", message: "Last name is required" });
  }

  if (!formData.email.trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!validateEmail(formData.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" });
  }
  
  if (!formData.password) {
    errors.push({ field: "password", message: "Password is required" });
  } else if (formData.password.length < 6) {
    errors.push({ field: "password", message: "Password must be at least 6 characters" });
  }

  if (!formData.phone.trim()) {
    errors.push({ field: "phone", message: "Phone number is required" });
  } else if (!validatePhone(formData.phone)) {
    errors.push({ field: "phone", message: "Please enter a valid phone number" });
  }

  if (!formData.fieldOfInterest) {
    errors.push({ field: "fieldOfInterest", message: "Please select a field of interest" });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate admin login form
 */
export const validateAdminLogin = (formData: {
  email: string;
  password: string;
}): { valid: boolean; errors: ValidationError[] } => {
  const errors: ValidationError[] = [];

  if (!formData.email.trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!validateEmail(formData.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" });
  }

  if (!formData.password) {
    errors.push({ field: "password", message: "Password is required" });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate user login form (email/password)
 */
export const validateUserLogin = (formData: {
  email: string;
  password: string;
}): { valid: boolean; errors: ValidationError[] } => {
  const errors: ValidationError[] = [];

  if (!formData.email.trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!validateEmail(formData.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" });
  }

  if (!formData.password) {
    errors.push({ field: "password", message: "Password is required" });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
