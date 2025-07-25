// src/modules/auth/services/AuthDomainService.ts
import { injectable, inject } from "tsyringe";
import type { AuthLoginPayload } from "../models/AuthPayload";
import { AuthHttpRepository } from "../../infrastructure/AuthHttpRepository";
import type { IAuthRepository } from "../repositories/IAuthRepository";

@injectable()
export class AuthDomainService {
  constructor(@inject(AuthHttpRepository) private _repo: IAuthRepository) {}

  async validateLogin(payload: AuthLoginPayload) {
    if (!payload.email || !payload.password) {
      throw new Error("Invalid login data");
    }

    const isValidEmail = this.isValidEmail(payload.email);
    if (!isValidEmail) {
      throw new Error("Invalid email format");
    }

    return payload;
  }

  private isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
