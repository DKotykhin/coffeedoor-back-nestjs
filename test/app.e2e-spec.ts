import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { LanguageCode, RoleTypes } from './../src/database/db.enums';
import { CreateMenuCategoryDto } from './../src/menu-category/dto/create-menu-category.dto';

const credentials = {
  email: 'kotykhin_d+1@ukr.net',
  password: 'Qq1234567',
};

const mockMenuCategory: CreateMenuCategoryDto = {
  language: LanguageCode.UA,
  title: 'Test title',
  description: 'Test description',
  image: 'Test image url',
  hidden: false,
  position: 1,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get all menu', async () => {
    const res = await request(app.getHttpServer())
      .get('/all-menu?language=UA')
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  let authToken: string;
  it('should login', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(credentials)
      .expect(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email');
    expect(res.body.email).toBe(credentials.email);
    expect(res.body.role).toContain(RoleTypes.ADMIN || RoleTypes.SUBADMIN);
    expect(res.headers['set-cookie'][0]).toMatch(/auth_token=.+;/);
    const authTokenMatch =
      res.headers['set-cookie'][0].match(/auth_token=([^;]+)/);
    if (authTokenMatch && authTokenMatch.length > 1)
      authToken = authTokenMatch[1];
  });

  it('should get all menu categories', async () => {
    const res = await request(app.getHttpServer())
      .get('/menu-categories')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  let menuCategoryId: string;
  it('should create menu category', async () => {
    const res = await request(app.getHttpServer())
      .post('/menu-categories')
      .set('Authorization', `Bearer ${authToken}`)
      .send(mockMenuCategory)
      .expect(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Test title');
    menuCategoryId = res.body.id;
  });

  it('should get menu category by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/menu-categories/${menuCategoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Test title');
  });

  it('should update menu category', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/menu-categories/update/${menuCategoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ ...mockMenuCategory, title: 'Updated test title' })
      .expect(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Updated test title');
  });

  it('should delete menu category', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/menu-categories/${menuCategoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    expect(res.body).toHaveProperty('status', true);
  });

  it('should not get menu category by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/menu-categories/${menuCategoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    expect(res.body).toStrictEqual({});
  });
});
