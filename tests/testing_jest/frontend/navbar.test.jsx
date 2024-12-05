import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../../../../../resources/js/Components/NavBar';
import '@testing-library/jest-dom';

// Mock external dependencies
jest.mock('@inertiajs/react', () => ({
  usePage: jest.fn(),
  Link: ({ href, children, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('../../../../../resources/assets/images/just-text.png', () => 'mock-logo.png');
jest.mock('../../../../../resources/js/Components/Button', () => ({ text, className }) => <button className={className}>{text}</button>);
jest.mock('../../../../../resources/js/Components/SearchBar', () => () => <input data-testid="search-bar" />);

describe('NavBar Component', () => {
  /**
   * Mock implementation of the usePage hook from @inertiajs/react.
   * This is used for testing purposes to simulate the behavior of the usePage hook.
   *
   * @constant
   * @type {Function}
   */
  const mockUsePage = require('@inertiajs/react').usePage;

  beforeEach(() => {
    mockUsePage.mockReturnValue({
      props: {
        auth: { user: null }, // Default: No user
      },
    });
  });

  test('renders logo and search bar', () => {
    render(<NavBar />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  test('renders "Sign in" button when user is not logged in', () => {
    render(<NavBar />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  test('renders user name and dropdown when user is logged in', () => {
    mockUsePage.mockReturnValue({
      props: {
        auth: { user: { name: 'Test User' } },
      },
    });

    render(<NavBar />);
    expect(screen.getByText('Test User')).toBeInTheDocument();

    const dropdownToggle = screen.getByText('Test User');
    fireEvent.click(dropdownToggle);

    expect(screen.getByText('CMS')).toBeInTheDocument();
    expect(screen.getByText('Bookmark')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('toggles dropdown visibility on button click', () => {
    mockUsePage.mockReturnValue({
      props: {
        auth: { user: { name: 'Test User' } },
      },
    });

    render(<NavBar />);
    const dropdownToggle = screen.getByText('Test User');

    // Dropdown closed initially
    expect(screen.queryByText('CMS')).toBeNull();

    // Open dropdown
    fireEvent.click(dropdownToggle);
    expect(screen.getByText('CMS')).toBeInTheDocument();

    // Close dropdown
    fireEvent.click(dropdownToggle);
    expect(screen.queryByText('CMS')).toBeNull();
  });
});
