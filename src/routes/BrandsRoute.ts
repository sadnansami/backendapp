import express, { Router } from "express";
import Brands from "../Brands";
import Configuration from "../Configuration";

class BrandsRoute extends Configuration {
	brands = new Brands();

	constructor(app: express.Application) {
		super(app, "/brands")
	}

	routeHandler() {
		this.router.get("/:id?", async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
			try {
				const brandsData = await this.brands.read(parseInt(req.params.id))
				
				res.json(brandsData);
			} catch(err) {		
				next(err)
			}
		});
	}
	
}



export default BrandsRoute;