import express from "express";
import "dotenv/config";
import Database from "./src/Database";
import BrandsRoute from "./src/routes/BrandsRoute";
import WatchesRoute from "./src/routes/WatchesRoute";
import UsersRoute from "./src/routes/UsersRoute";

const PORT = 2000;
const CREDENTIALS = {
	HOST: process.env.HOST!,
	USER: process.env.USER!,
	PASSWORD: process.env.PASSWORD!,
	DB: process.env.DB!
};

Database.connect(CREDENTIALS);

const app = express();
const routers = [
	BrandsRoute,
	WatchesRoute,
	UsersRoute,
]

routers.forEach((router) => {
	new router(app)
})

app.listen(PORT, () => {
	console.log(`Watchify Server running on port: ${PORT}`);
});
