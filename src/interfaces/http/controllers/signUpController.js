import signUp from "../../../domain/useCases/signUp.js";
import errorHandler from "../../../utils/errorHandler.js";

async function signUpController(req, res) {
  try {
    const { nome, email, senha, telefones } = req.body;
    const user = await signUp({ nome, email, senha, telefones });
    res.status(201).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
}

export default signUpController;
