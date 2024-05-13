import { listen } from "./app.js";
const PORT = process.env.PORT || 3000;

listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
