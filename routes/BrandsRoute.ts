import express, { Router } from "express";
import Brands from "../src/Brands";

const router = Router();

const brands = new Brands();

router.get("/", (req: express.Request, res: express.Response): void => {
	brands.read()
		.then((data) => {
			res.json(data);
		}).catch(() => {
			res.json([])
		})
});

export { router };