// Email validation
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation
export const MIN_PASSWORD_LENGTH = 6;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[a-zA-Z\d@$!%*?&#]{8,}$/;

// Name validation
export const NAME_REGEX = /^[a-zA-Z\s'-]{2,30}$/;
