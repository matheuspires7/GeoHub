import express from "express";
import { loginController, criarUsuarioController } from "../controllers/authController";
import { autenticar } from "../middlewares/autenticar";

const router = express.Router();

router.post("/login", loginController);
router.post("/usuarios", autenticar, criarUsuarioController);

export default router;
