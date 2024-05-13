import signIn from "../../../domain/useCases/signIn.js";
import errorHandler from "../../../utils/errorHandler.js";

async function signInController(req, res) {
  try {
    const { email, senha } = req.body;
    const user = await signIn({ email, senha });
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
}

export default signInController;
