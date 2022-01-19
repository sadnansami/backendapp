import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DatabaseConnector } from "./src/DatabaseConnector";
import Brands from "./src/Brands";
import Watches from "./src/Watches";
import Users from "./src/Users";

/*
This is a workaround since 'dotenv.config().parsed' produces an object with all the credentials,
however it isnt possible to do anything with it except printing it in the console.
The most convenient method which we can use is 'copying' it using 'JSON.stringify()' and then turning it back into a real Javascript object with 'JSON.parse()'
*/
const CREDENTIALS = JSON.parse(JSON.stringify(dotenv.config().parsed))
const PORT = 2000


const app = express();

const db = DatabaseConnector.createInstance(CREDENTIALS);


const brands = new Brands(db);
const watches = new Watches(db);
const users = new Users(db);

//Used to allow Cross-origin HTTP requests since the backend and frontend communicate via HTTP form different addresses
app.use(cors());

//Used for JSON data handling
app.use(express.json())

app.get("/readbrands", (req: express.Request, res: express.Response): void => {
	brands.read().then((data) => {
		res.json(data);
	})
})

app.post("/updatewatchprice", (req: express.Request, res: express.Response): void => {
	req.body.priceList.forEach((item: any) => {
		console.log(item.y.mean.value)
	});
})

app.get("/createwatch", (req: express.Request, res: express.Response): void => {
	watches.create().then((data) => {
		console.log(data)
	})
})

app.listen(PORT, (): void => {
	console.log(`Watchify Server running on port: ${PORT}`);
});