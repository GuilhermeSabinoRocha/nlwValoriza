import { Compliment } from '../entities/Compliment';
import { EntityRepository, getRepository, Repository } from 'typeorm';

@EntityRepository(Compliment)
 class ComplimentsRepositories extends Repository<Compliment> {
}
export {ComplimentsRepositories}