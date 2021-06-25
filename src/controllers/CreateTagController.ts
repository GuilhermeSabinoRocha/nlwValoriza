import { Request, Response } from 'express';
import { CreateTagService } from '../services/CreateTagService';

 class CreateTagController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome } = request.body;

    const createTagService = new CreateTagService();

    const tag = await createTagService.execute({ nome });

    return response.json(tag);
  }
}

export { CreateTagController };