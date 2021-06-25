import { User } from '../entities/User';

import { getCustomRepository, getRepository, Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
    email: string,
    password: string
}
 class AuthenticateUserService {
         
    async execute({email, password}: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ email });

    if (!user) throw new Error('Email/password incorrect.');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error('Email/password incorrect.');

    const token = sign(
      {
        email: user.email,
      },
      'bc2e10d13ae766ef65d1686480be542c',
      {
        subject: user.id,
          expiresIn: '7d'
      }
    );

    return token;
  }
}

export {AuthenticateUserService }