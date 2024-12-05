// __tests__/LoginPage.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../../../resources/js/Pages/Auth/Login'; // Update the path accordingly
import { useForm } from '@inertiajs/react';


// Mock the useForm hook from Inertia.js
jest.mock('@inertiajs/react', () => ({
  useForm: jest.fn(),
  Head: () => null,
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

beforeAll(() => {
  global.route = jest.fn((name) => {
    const routes = {
      'password.request': '/forgot-password',
      'login': '/login',
      // Add other routes as needed
    };
    return routes[name] || '/';
  });
});

describe('LoginPage', () => {
  const mockPost = jest.fn();
  const mockSetData = jest.fn();
  const mockReset = jest.fn();

beforeEach(() => {
  useForm.mockReturnValue({
    data: {
      email: '',
      password: '',
      remember: false,
    },
    setData: mockSetData,
    post: mockPost,
    processing: false,
    errors: {},
    reset: mockReset,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

  // test('renders the login form correctly', () => {
  //   render(<LoginPage />);

  //   expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  //   expect(screen.getByText(/remember me/i)).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  //   expect(screen.getByAltText(/sign in with google/i)).toBeInTheDocument();
  // });

  test('updates email and password fields', () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(mockSetData).toHaveBeenCalledWith('email', 'test@example.com');
    expect(mockSetData).toHaveBeenCalledWith('password', 'password123');
  });

  test('submits the form with correct data', () => {
    useForm.mockReturnValue({
      data: {
        email: 'test@example.com',
        password: 'password123',
        remember: true,
      },
      setData: mockSetData,
      post: mockPost,
      processing: false,
      errors: {},
      reset: mockReset,
    });

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const rememberCheckbox = screen.getByLabelText(/remember me/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(rememberCheckbox);
    fireEvent.click(submitButton);

    expect(mockPost).toHaveBeenCalledWith(route('login'), {
      onFinish: expect.any(Function),
    });
  });

  test('displays validation errors', () => {
    useForm.mockReturnValue({
      data: {
        email: '',
        password: '',
        remember: false,
      },
      setData: mockSetData,
      post: mockPost,
      processing: false,
      errors: {
        email: 'The email field is required.',
        password: 'The password field is required.',
      },
      reset: mockReset,
    });

    render(<LoginPage />);

    expect(screen.getByText(/the email field is required./i)).not.toBeNull();
    expect(screen.getByText(/the password field is required./i)).not.toBeNull();
  });

  test('handles form submission when processing', () => {
    useForm.mockReturnValue({
      data: {
        email: 'test@example.com',
        password: 'password123',
        remember: false,
      },
      setData: mockSetData,
      post: mockPost,
      processing: true,
      errors: {},
      reset: mockReset,
    });

    render(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: /login/i });
    expect(submitButton).toBeDisabled();
  });
});