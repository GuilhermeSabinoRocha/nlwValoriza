import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from "../repositories/TagsRepositories";
import "express-async-errors";


 class CreateTagService {
  async execute ({ nome }) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if (!nome) {
      throw new Error('Incorrect nome');
    }

    const tagExists = await tagsRepositories.findOne({ nome });

    if (tagExists) {
      throw new Error('Tag already exists');
    }

    const tag = tagsRepositories.create({
      nome,
    });

    await tagsRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService };