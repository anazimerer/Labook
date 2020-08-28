import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import { SignupInputDTO, LoginInputDTO } from "../model/User";

export default class UseController {
  async signup(req: Request, res: Response): Promise<void> {
    const userBusiness: UserBusiness = new UserBusiness();
    try {
      const signupInputDTO: SignupInputDTO = req.body;
      const token = await userBusiness.signup(signupInputDTO);

      res.status(200).send({ message: "Usuário cadastrado", token });
    } catch (error) {
      res.status(400).send({ message: error.sqlMessage || error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const userBusiness: UserBusiness = new UserBusiness();
    try {
      const loginInputDTO: LoginInputDTO = req.body;
      const token = await userBusiness.login(loginInputDTO);

      res.status(200).send({ message: "Usuário logado", token });
    } catch (error) {
      res.status(400).send({ message: error.sqlMessage || error.message });
    }
  }
}
