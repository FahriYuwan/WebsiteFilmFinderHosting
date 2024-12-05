import InputField from '../components/InputField';

const RememberMe = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <InputField
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-indigo-600 border-dark-border focus:ring-indigo-500"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
          Remember me
        </label>
      </div>
      <div className="text-sm">
        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
          Forgot your password?
        </a>
      </div>
    </div>
  );
};

export default RememberMe;