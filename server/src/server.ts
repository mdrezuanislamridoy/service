import app from "./app.js";
import connectDB from "./config/database.js";
import { env } from "./config/dotenv.js";

const port = env.PORT || 9999;

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
