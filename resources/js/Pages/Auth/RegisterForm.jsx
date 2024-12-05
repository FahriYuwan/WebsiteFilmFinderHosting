import React from 'react';
import InputField from '../../Components/InputField';
import SubmitButton from '../../Components/Button';
import Divider from '../../Components/Divider';
import SocialButton from '../../Components/SocialButton';
import googleLogo from '../../assets/images/google-login.png';
import { Head, Link, useForm } from '@inertiajs/react';

const RegisterForm = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <>
      <Head title="Register" />
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <InputField
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <div>{errors.name}</div>}

          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
          {errors.email && <div>{errors.email}</div>}

          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
          {errors.password && <div>{errors.password}</div>}

          <InputField
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            placeholder="Confirm Password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
          />
          {errors.password_confirmation && <div>{errors.password_confirmation}</div>}
        </div>
        <SubmitButton
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-dark-accent hover:bg-dark-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          text="Register"
          disabled={processing}
        />
        <Divider />
        <SocialButton iconUrl={googleLogo} altText="Sign up with Google" />
      </form>
    </>
  );
};

export default RegisterForm;