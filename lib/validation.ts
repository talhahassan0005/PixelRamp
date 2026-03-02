export function isNonEmptyString(value: any): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isEmail(value: any): boolean {
  if (typeof value !== 'string') return false;
  return /\S+@\S+\.\S+/.test(value);
}

export function sanitizeString(value: any): string {
  if (typeof value !== 'string') return '';
  return value.trim();
}
