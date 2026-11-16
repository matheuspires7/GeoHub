import api from "./api";

export interface NovoUsuario {
  nome: string;
  usuario: string;
  senha: string;
}

export const criarUsuario = async (dados: NovoUsuario) => {
  const response = await api.post("/auth/usuarios", dados);
  return response.data;
};
