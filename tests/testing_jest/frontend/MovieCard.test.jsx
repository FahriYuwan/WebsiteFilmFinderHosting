import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from '../../../../../resources/js/Components/MovieCard';
import { usePage, router, useForm } from '@inertiajs/react';
import '@testing-library/jest-dom';

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

// Mock the `route` function
global.route = jest.fn((name, params) => {
  if (name === 'bookmarks.store') {
    return `/bookmarks/store/${params.film_id}`;
  }
  return '/';
});

describe('MovieCard Component', () => {
  const mockUsePage = require('@inertiajs/react').usePage;

  beforeEach(() => {
    mockUsePage.mockReturnValue({
      props: {
        auth: { user: null }, // Default: No user
      },
    });
  });

  test('renders movie card with image, title, and availability', () => {
    render(<MovieCard id={1} imgSrc="test.jpg" title="Test Movie" availability="Available" isBookmarked={false} />);
    expect(screen.getByAltText('Test Movie Image')).toBeInTheDocument();
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  test('handles image error', () => {
    render(<MovieCard id={1} imgSrc="invalid.jpg" title="Test Movie" availability="Available" isBookmarked={false} />);
    const image = screen.getByAltText('Test Movie Image');
    fireEvent.error(image);
    expect(image.src).toBe('https://via.placeholder.com/300');
  });

  test('redirects to login if not authenticated and bookmark is clicked', () => {
    render(<MovieCard id={1} imgSrc="test.jpg" title="Test Movie" availability="Available" isBookmarked={false} />);
    const bookmarkButton = screen.getByRole('button');
    fireEvent.click(bookmarkButton);
    expect(router.get).toHaveBeenCalledWith('/login');
  });
});
