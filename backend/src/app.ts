import express from "express";
import cors from "cors";
import continenteRoutes from "./routes/continenteRoutes";
import paisRoutes from "./routes/paisRoutes";
import cidadeRoutes from "./routes/cidadeRoutes";
import authRoutes from "./routes/authRoutes";
import { autenticar } from "./middlewares/autenticar";

const app = express();

app.use(cors());
app.use(express.json());

// aberta
app.use("/auth", authRoutes);

// só com token
app.use("/continentes", autenticar, continenteRoutes);
app.use("/paises", autenticar, paisRoutes);
app.use("/cidades", autenticar, cidadeRoutes);

export default app;
