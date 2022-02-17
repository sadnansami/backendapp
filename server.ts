import express from "express";
import cors from "cors";
import "dotenv/config";
import DatabaseConnector from "./src/Database";
import { router as brandsrouter } from "./routes/BrandsRoute";
import { router as watchesrouter } from "./routes/WatchesRoute";

const CREDENTIALS = {
	HOST: process.env.HOST!,
	USER: process.env.USER!,
	PASSWORD: process.env.PASSWORD!,
	DB: process.env.DB!
};

const PORT = 2000
const app = express();

DatabaseConnector.connect(CREDENTIALS);

//Used to allow Cross-origin HTTP requests since the backend and frontend communicate via HTTP from different addresses
app.use(cors());
//Used for JSON data handling
app.use(express.json())
app.use("/brands", brandsrouter)
app.use("/watches", watchesrouter)

app.listen(PORT, () => {
	console.log(`Watchify Server running on port: ${PORT}`);
});
