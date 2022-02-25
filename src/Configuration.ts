import express, { Router } from "express"
import cors from "cors";
import session from "express-session";

abstract class Configuration {
	app: express.Application;
	router = Router();

	constructor(app: express.Application, routerPath: string) {
		this.app = app;
		//Used to allow Cross-origin HTTP requests since the backend and frontend communicate via HTTP from different addresses
		app.use(cors());
		//Used for JSON data handling
		app.use(express.json())
		//Used for keeping user data in authentication using sessions.
		//app.use(session())
		this.app.use(routerPath, this.router)
		this.routeHandler()
		this.app.use(this.validateRequest)
	}

	validateRequest(err: express.ErrorRequestHandler, req: any, res: express.Response, next: express.NextFunction): any {
		res.end()
		console.log(err)
	}

	abstract routeHandler(): void;
}

export default Configuration;