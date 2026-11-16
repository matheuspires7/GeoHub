import React, { useState } from "react";
import { criarUsuario } from "../services/api/usuarios";
import BackButton from "../components/BackButton";

const Usuarios: React.FC = () => {
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      await criarUsuario({ nome, usuario, senha });
      setSucesso(`User "${usuario}" created`);
      setNome("");
      setUsuario("");
      setSenha("");
    } catch {
      setErro("Could not create the user (username already exists?)");
    }
  };

  return (
    <div className="page">
      <BackButton />
      <h1 className="page-title">Add User</h1>

      {erro && <p className="alert-error">{erro}</p>}
      {sucesso && <p className="mb-4 text-center text-green-400">{sucesso}</p>}

      <form onSubmit={salvar} className="card mx-auto max-w-md">
        <div className="mb-4">
          <label htmlFor="nome" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="usuario" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="senha" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add User
        </button>
      </form>
    </div>
  );
};

export default Usuarios;
