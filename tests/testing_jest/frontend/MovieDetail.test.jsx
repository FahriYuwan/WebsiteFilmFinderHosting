import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieDetails from '../../../../../resources/js/Components/MovieDetails';
import { router } from '@inertiajs/react';
import React from 'react';

// Mock external dependencies
jest.mock('@inertiajs/react', () => ({
  usePage: jest.fn(),
  Link: ({ href, children, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  router: {
    get: jest.fn(),
    post: jest.fn(),
  },
  useForm: jest.fn(() => ({
    post: jest.fn(),
    delete: jest.fn(),
  })),
}));

// Mock the route function
global.route = jest.fn((name, params) => `${name}?${new URLSearchParams(params).toString()}`);

describe('MovieDetails Component', () => {
  const mockUsePage = require('@inertiajs/react').usePage;

  const film = {
    film_id: 1,
    url_banner: 'test.jpg',
    title: 'Test Movie',
    year_release: '2021',
    countries: { country_name: 'USA' },
    status: 'Released',
    awards: [{ award_name: 'Best Picture' }],
    duration: 120,
    synopsis: 'This is a test movie.',
    genres: [{ genre_name: 'Drama' }],
    availability: 'Available',
    rating_film: 'PG-13',
  };

  beforeEach(() => {
    mockUsePage.mockReturnValue({
      props: {
        auth: { user: null }, // Default: No user
      },
    });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders movie details correctly', () => {
    render(<MovieDetails film={film} isBookmarked={true} />);

    expect(screen.getByAltText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('Country : USA')).toBeInTheDocument();
    expect(screen.getByText('Status : Released')).toBeInTheDocument();
    expect(screen.getByText((content) => content.startsWith('Award :') && content.includes('Best Picture'))).toBeInTheDocument();
    expect(screen.getByText('Duration : 120 minutes')).toBeInTheDocument();
    expect(screen.getByText('This is a test movie.')).toBeInTheDocument();
    expect(screen.getByText('Genre : Drama')).toBeInTheDocument();
    expect(screen.getByText('Availability : Available')).toBeInTheDocument();
    expect(screen.getByText('Rating: PG-13')).toBeInTheDocument();
  });

  // test('handles bookmark button click', () => {
  //   mockUsePage.mockReturnValue({
  //     props: {
  //       auth: { user: { id: 1, name: 'Test User' } },
  //     },
  //   });

  //   const { post } = require('@inertiajs/react').useForm();

  //   render(<MovieDetails film={film} isBookmarked={false} />);
  //   const bookmarkButton = screen.getByRole('button', { name: /bookmark/i });
  //   fireEvent.click(bookmarkButton);

  //   expect(post).toHaveBeenCalledTimes(1);
  //   expect(post).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
  // });

  test('redirects to login if not authenticated and bookmark is clicked', () => {
    render(<MovieDetails film={film} isBookmarked={false} />);
    const bookmarkButton = screen.getByRole('button');
    fireEvent.click(bookmarkButton);

    expect(router.get).toHaveBeenCalledWith('/login');
  });
});
