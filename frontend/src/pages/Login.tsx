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
    <div className="min-h-screen flex justify-center items-center p-6">
      <form
        onSubmit={entrar}
        className="w-full max-w-sm bg-gray-800 p-8 rounded-xl shadow-md flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center text-white">GeoHub</h1>
        <p className="text-gray-400 text-center">Sign in to continue</p>

        {erro && <p className="text-red-400 text-center">{erro}</p>}

        <input
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Username"
          required
          className="p-3 rounded-lg bg-gray-700 text-white"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Password"
          required
          className="p-3 rounded-lg bg-gray-700 text-white"
        />

        <button className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition-all">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
