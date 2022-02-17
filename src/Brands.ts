import Database from "./Database";
import { IDatabase } from "./Interfaces";

class Brands extends Database implements IDatabase {
	constructor() {
		super("brands")
	}

	readOne(id: number):Promise<any> {
		return this.query("SELECT * FROM brands WHERE brand_id=?", [id])	 
	};
}

export default Brands;