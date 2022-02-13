import express, { Router } from "express";
import PatternMatching from "../src/utility/PatternMatching";
import Watches from "../src/Watches";

const router = Router();

const watches = new Watches();
const pm = new PatternMatching();


router.get("/", (req: express.Request, res: express.Response): void => {
	watches.read()
		.then((data) => {
			res.json(data);
		}).catch(() => {
			res.json([])
		})
});

router.put("/", (req: express.Request, res: express.Response): void => {
	req.body.priceList.forEach((item: any) => {
		console.log(item.y.mean.value)
	});
});

router.post("/", (req: express.Request, res: express.Response): void => {
	watches.create()
		.then((data) => {
			console.log(data)
		});
});

router.get("/match", (req: express.Request, res: express.Response): void => {
	let matches: Object[] = []
	watches.read()
		.then((data) => {
			data.forEach((watch: any) => {
				//Pattern matches by both name and model and if either returns true then 'matchFound' is true
				let matchFound = pm.match(watch.name, req.query.pattern!.toString()) || pm.match(watch.model, req.query.pattern!.toString())
		
				if(matchFound == true) {
					matches.push(watch)
					console.log(matches)
				}
			})
		})
		.then(() => {
			res.json({matches: matches})
		})
		.catch(() => {
			//Catch block catches any error such as if the pattern is longer than string and responds with an empty list
			res.json({matches: []})
		})
})

export { router };