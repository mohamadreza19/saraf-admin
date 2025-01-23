import { jwtDecode } from 'jwt-decode';

export function decodeToken(token: string): any {
  try {
    return jwtDecode(token); // Decodes the entire payload
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
