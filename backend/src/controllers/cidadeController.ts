import { Request, Response } from "express";
import {
  createCidade,
  getCidades,
  getCidadesPorPais,
  getCidadesPorContinente,
  getCidadeById,
  updateCidade,
  deleteCidade,
} from "../services/cidadeService";

export const createCidadeController = async (req: Request, res: Response) => {
  try {
    const { nome, populacao, latitude, longitude, paisId } = req.body;
    const cidade = await createCidade(
      nome,
      populacao,
      latitude,
      longitude,
      Number(paisId)
    );
    return res.status(201).json(cidade);
  } catch (err: any) {
    if (err.message === "PAIS_NOT_FOUND")
      return res.status(404).json({ error: "País não encontrado" });
    return res.status(500).json({ error: "Erro ao criar cidade" });
  }
};

export const getCidadesController = async (_req: Request, res: Response) => {
  try {
    const cidades = await getCidades();
    return res.status(200).json(cidades);
  } catch {
    return res.status(500).json({ error: "Erro ao buscar cidades" });
  }
};

export const getCidadesPorPaisController = async (
  req: Request,
  res: Response
) => {
  try {
    const { paisId } = req.params;
    const cidades = await getCidadesPorPais(Number(paisId));
    return res.status(200).json(cidades);
  } catch {
    return res.status(500).json({ error: "Erro ao buscar cidades por país" });
  }
};

export const getCidadesPorContinenteController = async (
  req: Request,
  res: Response
) => {
  try {
    const { continenteId } = req.params;
    const cidades = await getCidadesPorContinente(Number(continenteId));
    return res.status(200).json(cidades);
  } catch {
    return res
      .status(500)
      .json({ error: "Erro ao buscar cidades por continente" });
  }
};

export const getCidadeController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const idNumber = Number(id);

  if (isNaN(idNumber)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const cidade = await getCidadeById(idNumber);
    if (!cidade) {
      return res.status(404).json({ message: "Cidade não encontrada" });
    }
    res.status(200).json(cidade);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar a cidade" });
  }
};

export const updateCidadeController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const cidade = await updateCidade(Number(id), data);
    return res.status(200).json(cidade);
  } catch (err: any) {
    if (err.message === "PAIS_NOT_FOUND")
      return res.status(404).json({ error: "País não encontrado" });
    return res.status(500).json({ error: "Erro ao atualizar cidade" });
  }
};

export const deleteCidadeController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteCidade(Number(id));
    return res.status(200).json({ message: "Cidade deletada com sucesso" });
  } catch {
    return res.status(500).json({ error: "Erro ao deletar cidade" });
  }
};
