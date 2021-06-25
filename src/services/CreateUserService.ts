import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  nome: string;
  email: string;
  admin?: boolean;
  password: string;
}

 class CreateUserService {
  async execute ({ nome, email, admin = false, password }: IUserRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error('E-mail incorrect');
    }

    const userExists = await usersRepositories.findOne({ email });

    if (userExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepositories.create({
      nome,
      email,
      admin,
      password :passwordHash,
    });

    await usersRepositories.save(user);

    return user;
  }
}

export { CreateUserService };