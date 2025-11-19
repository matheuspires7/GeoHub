import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPais = async (
  nome: string,
  populacao: number,
  idiomaOficial: string,
  moeda: string,
  continenteId: number
) => {
  return await prisma.pais.create({
    data: {
      nome,
      populacao,
      idiomaOficial,
      moeda,
      continenteId,
    },
  });
};

export const getPaises = async () => {
  return await prisma.pais.findMany();
};

export const getPaisById = async (id: number) => {
  try {
    const pais = await prisma.pais.findUnique({
      where: {
        id: id,
      },
    });
    return pais;
  } catch (error) {
    throw new Error("Erro ao buscar o país");
  }
};

export const getPaisesPorContinente = async (continenteId: number) => {
  return await prisma.pais.findMany({
    where: {
      continenteId: continenteId,
    },
  });
};

export const updatePais = async (
  id: number,
  nome: string,
  populacao: number,
  idiomaOficial: string,
  moeda: string,
  continenteId: number
) => {
  return await prisma.pais.update({
    where: { id },
    data: { nome, populacao, idiomaOficial, moeda, continenteId },
  });
};

export const deletePais = async (id: number) => {
  return await prisma.pais.delete({
    where: { id },
  });
};
