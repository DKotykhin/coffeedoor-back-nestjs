import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(createUserDto);
    return this.entityManager.save(User, user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.entityManager.save(User, {
      id,
      ...updateUserDto,
    });
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
