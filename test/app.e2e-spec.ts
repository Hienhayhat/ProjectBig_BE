import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { readFileSync } from 'fs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('should allow for file uploads', async () => {
    return request(app.getHttpServer())
      .post('/file')
      .attach('file', './package.json')
      .field('name', 'test')
      .expect(201)
      .expect({
        body: {
          name: 'test',
        },
        file: readFileSync('./package.json').toString(),
      });
  });
});
