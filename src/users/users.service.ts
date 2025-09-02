import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { AppErrors } from 'src/constants/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(AppErrors.USER_NOT_FOUND);
    }

    return user;
  }

  async findUserByLogin(login: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { login } });

    if (!user) {
      return null;
    }

    return user;
  }

  async create(login: string, password: string): Promise<User> {
    return this.userRepository.save({
      login,
      passwordHash: password,
    });
  }
}
