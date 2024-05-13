import getUser from "../../../domain/useCases/getUser.js";
import errorHandler from "../../../utils/errorHandler.js";

async function getUserController(req, res) {
  try {
    const userId = req.params.userId;
    const user = await getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
}

export default getUserController;
