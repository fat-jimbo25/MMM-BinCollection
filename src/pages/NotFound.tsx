
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="text-center glass-dark p-8 rounded-xl animate-fade-in">
        <h1 className="text-5xl font-light mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-6">The page you're looking for doesn't exist</p>
        <a href="/" className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300">
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
