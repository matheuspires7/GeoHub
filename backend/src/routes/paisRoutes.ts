import express from "express";
import {
  createPaisController,
  getPaisesController,
  getPaisController,
  getPaisesPorContinenteController,
  updatePaisController,
  deletePaisController,
} from "../controllers/paisController";

const router = express.Router();

router.post("/", createPaisController);
router.get("/:id", getPaisController);
router.get("/", getPaisesController);
router.get("/continente/:continenteId", getPaisesPorContinenteController);
router.put("/:id", updatePaisController);
router.delete("/:id", deletePaisController);

export default router;
