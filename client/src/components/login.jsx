import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../images/tmg-logo.jpg';
import photo from '../images/mtl_logo.jpg';
import { useAuth } from './AuthContext';
import '../editorial.css';

function SignInOne() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        user_id: username,
        password: password
      });

      if (response.status === 200) {
        const token = response.data.token;
        login(token);
        navigate('/home', { state: { token, username } });
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <section className='w-screen min-h-screen flex items-center justify-center'>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white w-full h-full">
        <div className="flex w-full h-full items-center justify-center">
          <div className="mx-auto w-full max-w-sm lg:max-w-md border-2 border-gray-300 rounded-lg shadow-lg p-8 lg:max-w-lg xl:max-w-xl">
            <div className="flex flex-col items-center">
              <img src={logo} alt="school" className="mb-4 w-32 h-32" />
              <h2 className="text-3xl font-bold leading-tight text-center">
                <span className="text-blue-500">MTL</span>
                <span className="text-black">-DOT</span>
              </h2>
              <h2 className="text-xl font-semibold leading-tight text-black sm:text-2xl mt-4">
                Login
              </h2>
            </div>
            {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="userId" className="text-base font-medium text-gray-900">
                    User ID
                  </label>
                  <div className="mt-2">
                    <input
                      id="userId"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Enter your user ID"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash className="text-black" /> : <FaEye className="text-black" />}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Submit <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:block h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src={photo}
            alt="udayavani main building"
          />
        </div>
      </div>
    </section>
  );
}

export default SignInOne;
