import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api/api";

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const { data } = await api.post("/auth/login", { usuario, senha });
      localStorage.setItem("token", data.token);
      localStorage.setItem("nome", data.nome);
      navigate("/");
    } catch {
      setErro("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-5xl font-bold text-center text-white">GeoHub</h1>
      <p className="mt-4 text-gray-400 text-center">Sign in to continue</p>

      {erro && <p className="mt-4 text-red-500 text-center">{erro}</p>}

      <form onSubmit={entrar} className="mt-8 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="usuario" className="block text-lg font-semibold">
            Username
          </label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="senha" className="block text-lg font-semibold">
            Password
          </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
