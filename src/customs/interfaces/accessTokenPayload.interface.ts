export interface IAccessTokenPayload {
  sub: string; // Subject (used exactly profileID)
  // You can add any custom claims you want here, for example:
  // email?: string;
  // roles?: string[];
  iat?: number; // Issued At
  exp?: number; // Expiration Time
  iss?: string; // Issuer
  aud?: string; // Audience
  jti?: string; // JWT ID
}
