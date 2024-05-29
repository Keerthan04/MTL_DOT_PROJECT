import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
function ErrorOne() {
    const navigate = useNavigate();

    const navigateTo = () => {
        navigate('/');
    };
  return (
    <div className="flex items-center justify-center px-2 md:px-0">
      <div>
        <p className="text-sm font-semibold text-black">404 error</p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
          Please Login To Access the Page
        </h1>
        <div className="mt-6 flex items-center space-x-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={navigateTo}
          >
            <ArrowLeft size={16} className="mr-2" />
            Login
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default ErrorOne;
