import React from "react";
import { Link } from "react-router-dom";
import { Globe, Map, Building2 } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-5xl font-bold text-center text-white">GeoHub</h1>

      <p className="mt-4 text-gray-300 text-center text-lg max-w-3xl">
        The <strong> GeoHub </strong> is a geographic management platform where
        you can explore and manage data from continents, countries, and cities.
        Browse detailed information and view data in a simple and intuitive way.
      </p>

      <p className="mt-4 text-gray-400 text-center text-md">
        Select an option below to get started:
      </p>

      <div className="mt-10 flex flex-col md:flex-row gap-6">
        <Link
          to="/continentes"
          className="flex items-center gap-3 bg-blue-500 text-white px-6 py-4 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
        >
          <Globe />
          Continents
        </Link>

        <Link
          to="/paises"
          className="flex items-center gap-3 bg-green-500 text-white px-6 py-4 rounded-xl shadow-md hover:bg-green-700 hover:shadow-lg transition-all"
        >
          <Map />
          Countries
        </Link>

        <Link
          to="/cidades"
          className="flex items-center gap-3 bg-yellow-500 text-white px-6 py-4 rounded-xl shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all"
        >
          <Building2 />
          Cities
        </Link>
      </div>
    </div>
  );
};

export default Home;
