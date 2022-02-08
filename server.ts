import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DatabaseConnector from "./src/DatabaseConnector";
import Brands from "./src/Brands";
import Watches from "./src/Watches";
import Users from "./src/Users";
import PatternMatching from "./src/utility/PatternMatching";

/*
This is a workaround since 'dotenv.config().parsed' produces an object with all the credentials,
however it isnt possible to do anything with it except printing it in the console.
The most convenient method which we can use is 'copying' it using 'JSON.stringify()' and then turning it back into a real Javascript object with 'JSON.parse()'
*/
const CREDENTIALS = JSON.parse(JSON.stringify(dotenv.config().parsed))
const PORT = 2000


const app = express();

const db = DatabaseConnector.getInstance(CREDENTIALS);
const brands = new Brands(db);
const watches = new Watches(db);
const users = new Users(db);
const pm = new PatternMatching()

//Used to allow Cross-origin HTTP requests since the backend and frontend communicate via HTTP form different addresses
app.use(cors());

//Used for JSON data handling
app.use(express.json())

app.get("/readbrands", (req: express.Request, res: express.Response): void => {
	brands.read().then((data) => {
		res.json(data);
	})
});

app.get("/readwatches", (req: express.Request, res: express.Response): void => {
	watches.read().then((data) => {
		res.json(data);
	})
});

app.post("/updatewatchprice", (req: express.Request, res: express.Response): void => {
	req.body.priceList.forEach((item: any) => {
		console.log(item.y.mean.value)
	});
});

app.get("/createwatch", (req: express.Request, res: express.Response): void => {
	watches.create().then((data) => {
		console.log(data)
	});
});

app.get("/matchwatches", (req: express.Request, res: express.Response): void => {
	let matches: Object[] = []
	watches.read()
		.then((data) => {
			data.forEach((watch: any) => {
				//Pattern matches by both name and model and if either returns true then 'matchFound' is true
				let matchFound = pm.match(watch.name, req.query.pattern!.toString()) || pm.match(watch.name, req.query.pattern!.toString())
		
				if(matchFound == true) {
					matches.push(watch)	
				}
			})
		})
		.then(() => {
			res.json({matches: matches})
		})
		.catch((err) => {
			//Catch block catches any error such as if the pattern is longer than string and responds with an empty list
			res.json({matches: []})
		})
})

app.listen(PORT, (): void => {
	console.log(`Watchify Server running on port: ${PORT}`);
});