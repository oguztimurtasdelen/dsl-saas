export interface ICreateProfileTokenPayload {
  sub: string; // Subject (used exactly userID)
  iat?: number; // Issued At
  exp?: number; // Expiration Time
  iss?: string; // Issuer
  aud?: string; // Audience
  jti?: string; // JWT ID
}
