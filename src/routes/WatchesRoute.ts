import express from "express";
import Validation from "../Configuration";
import PatternMatching from "../utility/PatternMatching";
import Watches from "../Watches";
import WatchPrice from "../WatchPrice";

class WatchesRoute extends Validation {
	watches = new Watches();
	watchPrice = new WatchPrice();
	pm = new PatternMatching();

	constructor(app: express.Application) {
		super(app, "/watches")
	}

	routeHandler() {
		this.router.get("/:id?", async (req: any, res: express.Response, next: express.NextFunction): Promise<any> => {		
			try {
				const watchesData = await this.watches.read(parseInt(req.params.id))
				res.json(watchesData)
			} catch(err) {
				next(err)
			}
		});
		
		this.router.get("/price/:id", async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
			try {
				const priceData = await this.watchPrice.read(parseInt(req.params.id))
				res.json(priceData)
			} catch(err) {
				next(err)
			}
		});
		
		this.router.put("/", (req: express.Request, res: express.Response): void => {
			req.body.priceList.forEach((item: any) => {
				console.log(item.y.mean.value)
			});
		});
		
		this.router.post("/", (req: express.Request, res: express.Response): void => {
			this.watches.create()
				.then((data) => {
					console.log(data)
				});
		});
		
		this.router.get("/match/:pattern", async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
			try {
				let matches: Object[] = []
				const watchesData = await this.watches.read()
		
				watchesData.forEach((watch: any) => {
					//Pattern matches by both name and model and if either returns true then 'matchFound' is true
					let matchFound = this.pm.match(watch.data.name, req.params.pattern!.toString()) || this.pm.match(watch.data.model, req.params.pattern!.toString())
		
					console.log(watch.data)
					if(matchFound == true) {
						matches.push(watch.data)
					}
				})
		
				res.json(matches)
			} catch(err) {
				next(err)
			}
		})
	}
}

export default WatchesRoute;