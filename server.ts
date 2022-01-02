import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DatabaseConnector from "./src/DatabaseConnector";
import Brands from "./src/Brands";
import Watches from "./src/Watches";

/*
This is a workaround since 'dotenv.config().parsed' produces an object with all the credentials,
however it isnt possible to do anything with it except printing it in the console.
The most convenient method which we can use is 'copying' it using 'JSON.stringify()' and then turning it back into a real Javascript object with 'JSON.parse()'
*/
const CREDENTIALS = JSON.parse(JSON.stringify(dotenv.config().parsed))
const PORT = 2000


const app = express()

const db = new DatabaseConnector(CREDENTIALS);

/*
The 'db' instance is like a token which is used to securely access a specific MySQL database connection as an API.
*/
db.request()

const brands = new Brands(db);
const watches = new Watches(db);

app.use(cors());

app.get("/requestbrands", (req: express.Request, res: express.Response): void => {
	brands.request().then((data) => {
		res.json(data);
	})
})

app.listen(PORT, (): void => {
	console.log(`Watchify Server running on port: ${PORT}`);
})