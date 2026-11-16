import app from "./app";
import { criarAdminInicial } from "./services/authService";

const PORT = 3000;

// garante o admin antes de começar a aceitar acessos
criarAdminInicial().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
