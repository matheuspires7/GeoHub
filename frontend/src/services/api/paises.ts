import api from "./api";

export interface Pais {
  id: number;
  nome: string;
  populacao: number;
  idiomaOficial: string;
  moeda: string;
  continenteId: number;
}

export const fetchPaises = async (): Promise<Pais[]> => {
  try {
    const response = await api.get("/paises");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar países:", error);
    return [];
  }
};

export const fetchPaisById = async (id: string): Promise<Pais | null> => {
  try {
    const response = await api.get(`/paises/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar país:", error);
    return null;
  }
};

export const addPais = async (pais: {
  nome: string;
  populacao: number;
  idiomaOficial: string;
  moeda: string;
  continenteId: number;
}): Promise<Pais | undefined> => {
  try {
    const response = await api.post("/paises", pais);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar país:", error);
    return undefined;
  }
};

export const updatePais = async (
  id: string,
  pais: {
    nome: string;
    populacao: number;
    idiomaOficial: string;
    moeda: string;
    continenteId: number;
  }
): Promise<Pais | undefined> => {
  try {
    const response = await api.put(`/paises/${id}`, pais);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar país:", error);
    return undefined;
  }
};

export const deletePais = async (
  id: string
): Promise<{ message: string } | undefined> => {
  try {
    const response = await api.delete(`/paises/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir país:", error);
    return undefined;
  }
};
