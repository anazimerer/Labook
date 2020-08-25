import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";

export default class UseController {
  async signup(req: Request, res: Response): Promise<void> {
    const userBusiness: UserBusiness = new UserBusiness();
    try {
      const { name, email, password } = req.body;
      const token = await userBusiness.signup(name, email, password);

      res.status(200).send({ message: "Usuário cadastrado", token });
    } catch (error) {
      res.status(400).send({ message: error.sqlMessage || error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const userBusiness: UserBusiness = new UserBusiness();
    try {
      const { email, password } = req.body;
      const token = await userBusiness.login(email, password);

      res.status(200).send({ message: "Usuário logado", token });
    } catch (error) {
      res.status(400).send({ message: error.sqlMessage || error.message });
    }
  }
}
