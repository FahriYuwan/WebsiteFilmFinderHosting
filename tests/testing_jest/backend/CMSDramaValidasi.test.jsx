// __tests__/CMSDramaValidasi.test.jsx

const request = require('supertest');
const nock = require('nock');
const baseUrl = 'http://127.0.0.1:8000';

describe('CMS Drama Validasi API Testing with Mocks', () => {
  let filmId;
  const authToken = 'authToken=mockedAuthToken';

  beforeAll(() => {
    // Mock the /cmsdrama endpoint for creating a film
    nock(baseUrl)
      .post('/cmsdrama', {
        title: 'Test Drama',
        synopsis: 'This is a test synopsis.',
        year_release: 2023,
        status: 'pending',
        availability: 'Netflix',
        url_trailer: 'https://trailer.link',
        duration: 120,
        genres_id: [1, 2],
        actors_id: [1, 2],
        awards_id: [1],
        countries_id: 1,
      })
      .matchHeader('Cookie', authToken)
      .reply(201, {
        film_id: 123,
        title: 'Test Drama',
      });
      // Assuming 201 Created

    // Mock the /cmsdrama endpoint for retrieving films
    nock(baseUrl)
      .get('/cmsdrama')
      .matchHeader('Cookie', authToken)
      .reply(200, [
        {
          film_id: 123,
          title: 'Test Drama',
        },
      ]);

    // Mock other endpoints as needed, e.g., update, accept, delete
  });

  afterAll(() => {
    nock.cleanAll();
  });

  it('should create a new film', async () => {
    const response = await request(baseUrl)
      .post('/cmsdrama')
      .set('Cookie', authToken)
      .send({
        title: 'Test Drama',
        synopsis: 'This is a test synopsis.',
        year_release: 2023,
        status: 'pending',
        availability: 'Netflix',
        url_trailer: 'https://trailer.link',
        duration: 120,
        genres_id: [1, 2],
        actors_id: [1, 2],
        awards_id: [1],
        countries_id: 1,
      })
      .expect(201); // Assuming 201 Created

    expect(response.body).toHaveProperty('film_id', 123);
    expect(response.body).toHaveProperty('title', 'Test Drama');
    filmId = response.body.film_id;
  });

  it('should retrieve all films', async () => {
    const response = await request(baseUrl)
      .get('/cmsdrama')
      .set('Cookie', authToken)
      .expect(200); // Assuming 200 OK

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('film_id', 123);
    expect(response.body[0]).toHaveProperty('title', 'Test Drama');
  });

  // Uncomment and adjust these tests as needed
  it('should update a film', async () => {
    nock(baseUrl)
      .post(`/cmsdrama/update/${filmId}`, {
        title: 'Updated Test Drama',
        synopsis: 'Updated synopsis.',
        year_release: 2024,
        status: 'accepted',
        availability: 'Hulu',
        url_trailer: 'https://updated-trailer.link',
        duration: 150,
        genres_id: [1],
        actors_id: [1],
        awards_id: [2],
        countries_id: 2,
      })
      .matchHeader('Cookie', authToken)
      .reply(302, {}, { Location: '/cmsdrama' });

    const response = await request(baseUrl)
      .post(`/cmsdrama/update/${filmId}`)
      .set('Cookie', authToken)
      .send({
        title: 'Updated Test Drama',
        synopsis: 'Updated synopsis.',
        year_release: 2024,
        status: 'accepted',
        availability: 'Hulu',
        url_trailer: 'https://updated-trailer.link',
        duration: 150,
        genres_id: [1],
        actors_id: [1],
        awards_id: [2],
        countries_id: 2,
      })
      .expect(302);

    expect(response.headers['location']).toBe('/cmsdrama');
  });

  it('should accept a film', async () => {
    nock(baseUrl)
      .post(`/cmsdrama/accept/${filmId}`, {
        status: 'pending',
        search: '',
        perPage: 10,
        page: 1,
      })
      .matchHeader('Cookie', authToken)
      .reply(302, {}, { Location: '/cmsdrama' });

    const response = await request(baseUrl)
      .post(`/cmsdrama/accept/${filmId}`)
      .set('Cookie', authToken)
      .send({
        status: 'pending',
        search: '',
        perPage: 10,
        page: 1,
      })
      .expect(302);

    expect(response.headers['location']).toBe('/cmsdrama');
  });

  it('should reject a film', async () => {
    nock(baseUrl)
      .post(`/cmsdrama/reject/${filmId}`, {
        status: 'accepted',
        search: '',
        perPage: 10,
        page: 1,
      })
      .matchHeader('Cookie', authToken)
      .reply(302, {}, { Location: '/cmsdrama' });

    const response = await request(baseUrl)
      .post(`/cmsdrama/reject/${filmId}`)
      .set('Cookie', authToken)
      .send({
        status: 'accepted',
        search: '',
        perPage: 10,
        page: 1,
      })
      .expect(302);

    expect(response.headers['location']).toBe('/cmsdrama');
  });

  it('should delete a film', async () => {
    nock(baseUrl)
      .delete(`/cmsdrama/${filmId}`)
      .matchHeader('Cookie', authToken)
      .reply(302, {}, { Location: '/cmsdrama' });

    const response = await request(baseUrl)
      .delete(`/cmsdrama/${filmId}`)
      .set('Cookie', authToken)
      .expect(302);

    expect(response.headers['location']).toBe('/cmsdrama');
  });
  
});