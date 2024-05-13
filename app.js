import express, { json } from "express";
import { connect } from "mongoose";
import routes from "./src/interfaces/http/routes.js";
import { MONGO_URI } from "./config.js";

const app = express();

app.use(json());

connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
