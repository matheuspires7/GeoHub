import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, Map, Building2, LogOut } from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const nome = localStorage.getItem("nome");

  // sair = apagar o token do navegador
  const sair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <span className="text-gray-300">{nome}</span>
        <button
          onClick={sair}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-red-700 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>

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
