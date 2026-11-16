import { Request, Response } from "express";
import { login, criarUsuario } from "../services/authService";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { usuario, senha } = req.body;
    if (!usuario || !senha) {
      return res.status(400).json({ error: "Informe usuário e senha" });
    }

    const resultado = await login(usuario, senha);
    if (!resultado) {
      return res.status(401).json({ error: "Usuário ou senha incorretos" });
    }

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};

export const criarUsuarioController = async (req: Request, res: Response) => {
  try {
    const { nome, usuario, senha } = req.body;
    if (!nome || !usuario || !senha) {
      return res.status(400).json({ error: "Preencha nome, usuário e senha" });
    }

    const novo = await criarUsuario(nome, usuario, senha);
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: "Não foi possível criar (esse login já existe?)" });
  }
};
