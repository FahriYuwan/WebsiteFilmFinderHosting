import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import for toBeInTheDocument
import Comments from '../../../../../resources/js/Components/Comments';
import { usePage, useForm } from '@inertiajs/react';
import '@testing-library/jest-dom';

// Mock external dependencies
jest.mock('@inertiajs/react', () => ({
  usePage: jest.fn(),
  useForm: jest.fn(() => ({
    data: {},
    setData: jest.fn(),
    post: jest.fn(),
    processing: false,
    errors: {},
    reset: jest.fn(),
  })),
}));

// Mock the route function
global.route = jest.fn((name, params) => `${name}?${new URLSearchParams(params).toString()}`);

describe('Comments Component', () => {
  const mockUsePage = require('@inertiajs/react').usePage;

  beforeEach(() => {
    mockUsePage.mockReturnValue({
      props: {
        auth: { user: null }, // Default: No user
      },
    });
  });

  const film = {
    film_id: 1,
    actors: [
      { actor_name: 'Actor 1', url_actor: 'actor1.jpg' },
      { actor_name: 'Actor 2', url_actor: 'actor2.jpg' },
    ],
    url_trailer: 'https://www.youtube.com/embed/test',
    reviews: [
      { user: { name: 'User 1', created_at: '2021-01-01' }, rating_user: 5, review_text: 'Great movie!' },
      { user: { name: 'User 2', created_at: '2021-01-02' }, rating_user: 4, review_text: 'Good movie!' },
    ],
  };

  test('renders comments component with actors, trailer, and reviews', () => {
    render(<Comments film={film} />);
    expect(screen.getByAltText('Actor 1')).toBeInTheDocument();
    expect(screen.getByAltText('Actor 2')).toBeInTheDocument();
    expect(screen.getByTitle('YouTube video player')).toBeInTheDocument();
    expect(screen.getByText('Great movie!')).toBeInTheDocument();
    expect(screen.getByText('Good movie!')).toBeInTheDocument();
  });

  test('handles filter change', () => {
    render(<Comments film={film} />);
    const filterSelect = screen.getByLabelText('Filtered by:');
    fireEvent.change(filterSelect, { target: { value: '5' } });
    expect(screen.getByText('Great movie!')).toBeInTheDocument();
    expect(screen.queryByText('Good movie!')).toBeNull();
  });

  test('shows login message if not authenticated', () => {
    render(<Comments film={film} />);
    expect(screen.getByText('You must be logged in to submit a comment.')).toBeInTheDocument();
  });
});