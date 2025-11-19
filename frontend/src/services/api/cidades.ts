import api from "./api";

export interface Cidade {
  id: number;
  nome: string;
  populacao: number;
  latitude: number;
  longitude: number;
  paisId: number;
}

export const fetchCidades = async (): Promise<Cidade[]> => {
  try {
    const response = await api.get("/cidades");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    return [];
  }
};

export const fetchCidadeById = async (id: string): Promise<Cidade | null> => {
  try {
    const response = await api.get(`/cidades/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cidade:", error);
    return null;
  }
};

export const addCidade = async (cidade: {
  nome: string;
  populacao: number;
  latitude: number;
  longitude: number;
  paisId: number;
}): Promise<Cidade | undefined> => {
  try {
    const response = await api.post("/cidades", cidade);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar cidade:", error);
    return undefined;
  }
};

export const updateCidade = async (
  id: string,
  cidade: {
    nome: string;
    populacao: number;
    latitude: number;
    longitude: number;
    paisId: number;
  }
): Promise<Cidade | undefined> => {
  try {
    const response = await api.put(`/cidades/${id}`, cidade);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar cidade:", error);
    return undefined;
  }
};

export const deleteCidade = async (
  id: string
): Promise<{ message: string } | undefined> => {
  try {
    const response = await api.delete(`/cidades/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir cidade:", error);
    return undefined;
  }
};
