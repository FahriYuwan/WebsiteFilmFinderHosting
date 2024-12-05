import React from 'react';
// import InputField from '../../components/InputField';
import SubmitButton from '../../Components/Button';
import Divider from '../../Components/Divider';
import SocialButton from '../../Components/SocialButton';
import googleLogo from '../../assets/images/google-login.png';
// import RememberMe from '../../components/RememberMe';
import InputError from '../../Components/InputError';
import InputLabel from '../../Components/InputLabel';
import TextInput from '../../Components/TextInput';
import Checkbox from '../../Components/Checkbox';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
  return (  
    <form className="mt-8 space-y-4" onSubmit={props.handleSubmit}>
      <div className="space-y-4">
        <InputLabel htmlFor="email" value="Email" className='text-white' />
        <TextInput
          id="email"
          type="email"
          name="email"
          value={props.email}
          className="mt-1 block w-full"
          autoComplete="username"
          placeholder="Email"
          isFocused={true}
          onChange={(e) => props.setEmail(e.target.value)}
        />
        <InputError message={props.errors.email} className="mt-2" />

        <InputLabel htmlFor="password" value="Password" className='text-white' />
        <TextInput
          id="password"
          type="password"
          name="password"
          value={props.password}
          className="mt-1 block w-full"
          autoComplete="current-password"
          placeholder="Password"
          onChange={(e) => props.setPassword(e.target.value)}
        />
        <InputError message={props.errors.password} className="mt-2" />

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={props.remember}
              onChange={(e) => props.setRemember(e.target.checked)}
            />
            <span className="ms-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <SubmitButton
          className="w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-dark-accent hover:bg-dark-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          text="Login"
          disabled={props.processing}
        />
      </div>
      <Divider />
      <SocialButton iconUrl={googleLogo} altText="Sign in with Google" />
    </form>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  remember: PropTypes.bool.isRequired,
  setRemember: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  processing: PropTypes.bool.isRequired,
};
export default LoginForm;