import { app } from "@shared/infra/http/app";
import { hash } from "bcryptjs";
import request from 'supertest'
import { Connection} from "typeorm";
import { v4 } from "uuid";
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('List Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection('localhost');
    await connection.runMigrations();

    const id = v4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO users (id, name, email, password, driver_license, "isAdmin", created_at) 
        values ('${id}', 'admin', 'admin@rentx.com', '${password}', 'XXXXX', true, now())`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all categories', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rentx.com', password: 'admin' });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send( 
        {
          name: 'Category name test',
          description: 'Category description test',
        }
      ).set(
        'Authorization', `Bearer ${token}`
      );

    const response = await request(app).get('/categories')
      .set(
        'Authorization', `Bearer ${token}`
      );

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id")
    expect(response.body[0].name).toEqual("Category name test")
    expect(response.body[0].description).toEqual("Category description test")
  });
});