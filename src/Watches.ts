import DatabaseConnector from "./DatabaseConnector";
import { DBInterface } from "./Interfaces";

class Watches implements DBInterface {
	/*
	'db' instance is private due to security reasons. 
	This can cause unexpected errors if the properties of 'db' are accessed from this class
	*/

	db: DatabaseConnector;

	constructor(db: DatabaseConnector) {
		this.db = db

		//This is used to check on instantiation of the 'Brands' class whether the 'db' instance has established a connection to case debugging
		db.getConnection
	}

	request():Promise<object> {
		return new Promise((resolve, reject) => {
			this.db.getConnection.query("SELECT * FROM watches", (err: any, data: object, fields: any) => {
				return resolve(data)
			});
		});	
	}

	requestOne(id: number, brand_id?: number):Promise<any> {
		return new Promise((resolve, reject) => {
			if(brand_id) {
				//testing
				return resolve(null)
			} else {
				this.db.getConnection.query("SELECT * FROM watches WHERE watch_id=?", [id] , (err: any, data: any, fields: any) => {
					return resolve(data)
				});
			}
		});	
	};
}

export default Watches;