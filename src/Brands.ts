import { DatabaseConnector } from "./DatabaseConnector";
import { QueryInterface } from "./Interfaces";

class Brands implements QueryInterface {
	/*
	'db' instance is private due to security reasons. 
	This can cause unexpected errors if the properties of 'db' are accessed from this class
	*/


	constructor(private db: DatabaseConnector) {}

	read():Promise<object> {
		return this.db.query("SELECT * FROM brands");
	};

	readOne(id: number):Promise<object> {
		return this.db.query("SELECT * FROM brands WHERE brand_id=?", [id])	 
	};
}

export default Brands;