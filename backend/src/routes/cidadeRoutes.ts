import express from "express";
import {
  createCidadeController,
  getCidadesController,
  getCidadeController,
  getCidadesPorPaisController,
  getCidadesPorContinenteController,
  updateCidadeController,
  deleteCidadeController,
} from "../controllers/cidadeController";

const router = express.Router();

router.post("/", createCidadeController);
router.get("/:id", getCidadeController);
router.get("/", getCidadesController);
router.get("/pais/:paisId", getCidadesPorPaisController);
router.get("/continente/:continenteId", getCidadesPorContinenteController);
router.put("/:id", updateCidadeController);
router.delete("/:id", deleteCidadeController);

export default router;
