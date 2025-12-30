import { test, expect } from '@playwright/test';
import { request } from 'node:http';

const BASE_URL = 'http://localhost:3000';

test('Verifying an API', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/health`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.status).toBe('API funcionando');
});

test('List Users', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/users`)
  expect(response.status()).toBe(200);
  const users = await response.json();
  expect(users.length).toBeGreaterThan(0);
});

test('Creating users successfully', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/users`, {
    data: {
      name: 'Bárbara',
      email: 'barbara@email.com'
    }
  })
  expect(response.status()).toBe(201);
  const user = await response.json();
  expect(user.name).toBe('Bárbara');
});

test('Error creating user without required fields', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/users`, {
    data: {}
  })
  expect(response.status()).toBe(400);
  const user = await response.json();
  expect(user.message).toBe('Campos obrigatórios');
})