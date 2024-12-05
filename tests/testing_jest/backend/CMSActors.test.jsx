// cmsActorsEndpoints.test.js
const axios = require('axios');
const nock = require('nock');

describe('CMS Actors Endpoints', () => {
  const baseURL = 'http://localhost';

  afterEach(() => {
    nock.cleanAll();
  });

  test('Create a new actor', async () => {
    const actorData = {
      countries_id: '1',
      actor_name: 'New Actor',
      birthdate: '1990-01-01',
      url_actor: 'http://example.com/picture.jpg',
    };

    nock(baseURL)
      .post('/cmsactors', actorData)
      .reply(200, { success: true });

    const response = await axios.post(`${baseURL}/cmsactors`, actorData);

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });

  test('Read all actors', async () => {
    const actors = [
      {
        actor_id: 1,
        countries_id: '1',
        actor_name: 'Actor One',
        birthdate: '1990-01-01',
        url_actor: 'http://example.com/actor1.jpg',
        countries: { country_name: 'Country One' },
      },
      {
        actor_id: 2,
        countries_id: '2',
        actor_name: 'Actor Two',
        birthdate: '1992-02-02',
        url_actor: 'http://example.com/actor2.jpg',
        countries: { country_name: 'Country Two' },
      },
    ];

    nock(baseURL)
      .get('/cmsactors')
      .reply(200, actors);

    const response = await axios.get(`${baseURL}/cmsactors`);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(actors);
  });

  test('Update an actor', async () => {
    const actorId = 1;
    const updateData = {
      actor_name: 'Updated Actor',
      birthdate: '1990-01-01',
    };

    nock(baseURL)
      .put(`/cmsactors/${actorId}`, updateData)
      .reply(200, { success: true });

    const response = await axios.put(`${baseURL}/cmsactors/${actorId}`, updateData);

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });

  test('Delete an actor', async () => {
    const actorId = 1;

    nock(baseURL)
      .delete(`/cmsactors/${actorId}`)
      .reply(200, { success: true });

    const response = await axios.delete(`${baseURL}/cmsactors/${actorId}`);

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });
});