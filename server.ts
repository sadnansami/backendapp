import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DatabaseConnector from "./src/DatabaseConnector";
import Cache from "./src/utility/Cache";
import { router as brandsrouter } from "./routes/BrandsRoute";
import { router as watchesrouter } from "./routes/WatchesRoute";
import LinkedList from "./src/utility/LinkedList";
/*
This is a workaround since 'dotenv.config().parsed' produces an object with all the credentials,
however it isnt possible to do anything with it except printing it in the console.
The most convenient method which we can use is 'copying' it using 'JSON.stringify()' and then turning it back into a real Javascript object with 'JSON.parse()'
*/
const CREDENTIALS = JSON.parse(JSON.stringify(dotenv.config().parsed))
const PORT = 2000

const app = express();

DatabaseConnector.setConnection(CREDENTIALS);

//Used to allow Cross-origin HTTP requests since the backend and frontend communicate via HTTP form different addresses
app.use(cors());
//Used for JSON data handling
app.use(express.json())
app.use("/brands", brandsrouter)
app.use("/watches", watchesrouter)

app.listen(PORT, (): void => {
	console.log(`Watchify Server running on port: ${PORT}`);
});
