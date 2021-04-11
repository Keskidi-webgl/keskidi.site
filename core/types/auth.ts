export type LoginAuthCredential = {
  email: string
}

export type RegisterAuthCredential = {
  email: string
}

export type User = {
  id: number
}

export type AuthTokenPayloads = {
  aud: string,
  exp: number,
  iat: number,
  jti: string,
  nbf: number,
  scope: Array<string>,
  sub: string
}
