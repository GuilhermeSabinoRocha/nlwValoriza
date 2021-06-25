import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

 async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  
   const { user_id } = request;
   const repo = getCustomRepository(UsersRepositories);
   const user = await repo.findOne(user_id);
   
   if (user.admin) {
     
     return next();
   }

  return response.status(401).json({
    error: 'Unauthorized.'
  });
}
export { ensureAdmin };