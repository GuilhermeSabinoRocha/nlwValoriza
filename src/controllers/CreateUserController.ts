import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';


 class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, email, admin, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ nome, email, admin, password });

    return response.json(user);
  }
}

export { CreateUserController };