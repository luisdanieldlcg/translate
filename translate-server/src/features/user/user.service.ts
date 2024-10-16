import { Injectable, Logger } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// See https://stackoverflow.com/questions/58055145/how-to-fix-typeerror-cannot-read-property-hash-of-undefined-during-hashing-pa
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  private readonly logger: Logger = new Logger('UserService');

  async create(email: string, password: string) {
    try {
      const hash = await bcrypt.hash(password, 11);
      const user = this.userRepository.create({
        email,
        password_hash: hash,
        preferred_language: 1,
      });
      this.logger.log(`Creating user with email: ${email}`);
      return this.userRepository.save(user);
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  exists(email: string): Promise<boolean> {
    return this.userRepository.exists({ where: { email: email } });
  }
}
