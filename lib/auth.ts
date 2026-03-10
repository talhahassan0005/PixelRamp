import jwt from 'jsonwebtoken';

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    return true;
  } catch {
    return false;
  }
}

export function getUserFromToken(token: string): any {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
  } catch {
    return null;
  }
}