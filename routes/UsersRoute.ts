import express, { Router } from "express";
import Configuration from "../src/Configuration";
import Users from "../src/Users";

class UsersRoute extends Configuration {
	signedinUser: any;
	router = Router();
	users = new Users();

	constructor(app: express.Application) {
		super(app, "/users")
	}

	routeHandler() {
		this.router.get("/signedin", async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
			try{
				res.json(this.signedinUser);
			} catch(err) {
				next(err)
			}		
		});
		
		this.router.get("/:id?", async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
			try{
				const userData = await this.users.read(req.params.id)

				this.signedinUser = userData

				res.json(userData);
			} catch(err) {
				next(err)
			}		
		});
		
		this.router.post("/", async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
			try{
				const registerUser = await this.users.create(req.body)

				res.json(registerUser);
			} catch(err) {
				next(err)
			}
		});
			
		
	}
}

export default UsersRoute;