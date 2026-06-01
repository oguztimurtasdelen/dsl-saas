export interface IAccessTokenPayload {
  sub: string; // Subject (usually the user ID)
  // You can add any custom claims you want here, for example:
  // email?: string;
  // roles?: string[];
  iat?: number; // Issued At
  exp?: number; // Expiration Time
  iss?: string; // Issuer
  aud?: string; // Audience
  jti?: string; // JWT ID
}
