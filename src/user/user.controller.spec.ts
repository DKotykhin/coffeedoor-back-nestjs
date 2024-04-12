import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const user = {
  id: '1',
  email: 'kotykhin_d@ukr.net',
  name: 'Dmytro',
};

const mockUserService = {
  findById: jest.fn((id: string) => {
    return {
      id,
      email: user.email,
      name: user.name,
    };
  }),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find user by id', () => {
    expect(controller.findById('1')).toEqual({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  });
});
