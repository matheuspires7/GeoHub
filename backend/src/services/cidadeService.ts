import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCidade = async (
  nome: string,
  populacao: number,
  latitude: number,
  longitude: number,
  paisId: number
) => {
  const pais = await prisma.pais.findUnique({ where: { id: paisId } });
  if (!pais) throw new Error("PAIS_NOT_FOUND");

  return await prisma.cidade.create({
    data: {
      nome,
      populacao,
      latitude,
      longitude,
      paisId,
    },
    include: { pais: true },
  });
};

export const getCidades = async () => {
  return await prisma.cidade.findMany({
    include: {
      pais: {
        include: { continente: true },
      },
    },
  });
};

export const getCidadesPorPais = async (paisId: number) => {
  return await prisma.cidade.findMany({
    where: { paisId },
    include: {
      pais: { include: { continente: true } },
    },
  });
};

export const getCidadesPorContinente = async (continenteId: number) => {
  return await prisma.cidade.findMany({
    where: {
      pais: {
        continenteId: continenteId,
      },
    },
    include: {
      pais: { include: { continente: true } },
    },
  });
};

export const getCidadeById = async (id: number) => {
  try {
    const cidade = await prisma.cidade.findUnique({
      where: {
        id: id,
      },
      include: {
        pais: { include: { continente: true } },
      },
    });
    return cidade;
  } catch (error) {
    throw new Error("Erro ao buscar a cidade");
  }
};

export const updateCidade = async (
  id: number,
  data: {
    nome?: string;
    populacao?: number;
    latitude?: number;
    longitude?: number;
    paisId?: number;
  }
) => {
  if (data.paisId) {
    const pais = await prisma.pais.findUnique({ where: { id: data.paisId } });
    if (!pais) throw new Error("PAIS_NOT_FOUND");
  }

  return await prisma.cidade.update({
    where: { id },
    data,
    include: { pais: { include: { continente: true } } },
  });
};

export const deleteCidade = async (id: number) => {
  return await prisma.cidade.delete({ where: { id } });
};
