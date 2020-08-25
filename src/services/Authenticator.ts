import * as jwt from "jsonwebtoken";

export default class Authenticator {
  public generateToken(payload: AuthenticationData): string {
    const token = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.EXPIRES_IN,
    });
    return token;
  }

  public static getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    return { id: payload.id };
  }
}

interface AuthenticationData {
  id: string;
}
