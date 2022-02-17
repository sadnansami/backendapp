import express, { Router } from "express";
import Brands from "../src/Brands";

const router = Router();

const brands = new Brands();

router.get("/:id?", (req: express.Request, res: express.Response): void => {
	brands.read(parseInt(req.params.id))
		.then((data) => {
			res.json(data);
		}).catch(() => {
			res.json([])
		})
});

export { router };