import { AuthenticateUserService } from '../services/AuthenticateUserService';

import { Request, Response } from 'express';

class AuthenticateUserController {
     
  async handle(request: Request, response: Response): Promise<Response> {
    const authenticateUserService = new AuthenticateUserService();
    const token = await authenticateUserService.execute(request.body);

    return response.json(token);
  }
}

export {AuthenticateUserController }