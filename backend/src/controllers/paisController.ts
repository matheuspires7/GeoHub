import { Request, Response } from "express";
import {
  createPais,
  getPaises,
  updatePais,
  deletePais,
  getPaisesPorContinente,
  getPaisById,
} from "../services/paisService";

export const createPaisController = async (req: Request, res: Response) => {
  try {
    const { nome, populacao, idiomaOficial, moeda, continenteId } = req.body;
    const pais = await createPais(
      nome,
      populacao,
      idiomaOficial,
      moeda,
      continenteId
    );
    res.status(201).json(pais);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar país" });
  }
};

export const getPaisesController = async (req: Request, res: Response) => {
  try {
    const paises = await getPaises();
    res.status(200).json(paises);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar países" });
  }
};

export const getPaisController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const idNumber = Number(id);

  if (isNaN(idNumber)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const pais = await getPaisById(idNumber);
    if (!pais) {
      return res.status(404).json({ message: "País não encontrado" });
    }
    res.status(200).json(pais);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o país" });
  }
};

export const getPaisesPorContinenteController = async (
  req: Request,
  res: Response
) => {
  try {
    const { continenteId } = req.params;
    const paises = await getPaisesPorContinente(Number(continenteId));
    res.status(200).json(paises);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar países por continente" });
  }
};

export const updatePaisController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, populacao, idiomaOficial, moeda, continenteId } = req.body;
    const pais = await updatePais(
      Number(id),
      nome,
      populacao,
      idiomaOficial,
      moeda,
      continenteId
    );
    res.status(200).json(pais);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar país" });
  }
};

export const deletePaisController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deletePais(Number(id));
    res.status(200).json({ message: "País deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar país" });
  }
};
