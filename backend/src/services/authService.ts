import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (usuario: string, senha: string) => {
  const user = await prisma.usuario.findUnique({ where: { usuario } });

  // mesma resposta pra usuário que não existe e senha errada
  if (!user || !(await bcrypt.compare(senha, user.senha))) {
    return null;
  }

  const token = jwt.sign(
    { id: user.id, nome: user.nome },
    process.env.JWT_SECRET as string,
    { expiresIn: "8h" }
  );

  return { token, nome: user.nome };
};

export const criarUsuario = async (nome: string, usuario: string, senha: string) => {
  const hash = await bcrypt.hash(senha, 10);
  const novo = await prisma.usuario.create({
    data: { nome, usuario, senha: hash },
  });

  // nunca devolve a senha, nem o hash
  return { id: novo.id, nome: novo.nome, usuario: novo.usuario };
};

// quando o backend liga, cria o admin se o banco ainda não tiver ninguém
export const criarAdminInicial = async () => {
  const total = await prisma.usuario.count();
  if (total === 0) {
    await criarUsuario(
      "Administrador",
      process.env.ADMIN_USER as string,
      process.env.ADMIN_PASS as string
    );
    console.log("Usuário admin criado");
  }
};
