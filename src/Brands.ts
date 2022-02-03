import { DatabaseConnector } from "./DatabaseConnector";
import { IQuery } from "./Interfaces";

class Brands implements IQuery {
	/*
	'db' instance is private due to security reasons. 
	This can cause unexpected errors if the properties of 'db' are accessed from this class
	*/


	constructor(private db: DatabaseConnector) {}

	read():Promise<any> {
		return this.db.query("SELECT * FROM brands");
	};

	readOne(id: number):Promise<any> {
		return this.db.query("SELECT * FROM brands WHERE brand_id=?", [id])	 
	};
}

export default Brands;