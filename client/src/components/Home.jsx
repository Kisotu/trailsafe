import { ArrowRight } from 'lucide-react';
import { SignInButton, useUser } from '@clerk/clerk-react';

const Home = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-indigo-600">The Hiker's Safety Companion</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Your Guide to Safe and Enjoyable Hikes! 
          </p>
          <div className="mt-10 flex justify-center">
            {isSignedIn ? (
              <a
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            ) : (
              <SignInButton mode="modal">
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Experience</h3>
              <p className="text-gray-600">Add pins, rate safety, and share your experiences</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community insight</h3>
              <p className="text-gray-600">Navigate with real-time GPS and benefit from community insights.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customize trail</h3>
              <p className="text-gray-600">Customize your trail maps with personal notes, photos, and other relevant information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;