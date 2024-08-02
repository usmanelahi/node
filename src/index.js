import dbConnection from "./db/index.js";
import { app } from "./app.js";
import "dotenv/config";

dbConnection()
  .then(() => {
    app.listen(process.env.PORT || 8000);
    console.log(`App is listening on Port ${process.env.PORT}`);
  })
  .catch((error) => {
    console.log(`MONGO CONNECTION ERROR ====>>>  ${error}`);
  });
