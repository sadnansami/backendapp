import Connection from "mysql2/typings/mysql/lib/Connection";
import DatabaseConnector from "./DatabaseConnector";
import { DBInterface } from "./Interfaces";

class Brands implements DBInterface {
	/*
	'db' instance is private due to security reasons. 
	This can cause unexpected errors if the properties of 'db' are accessed from this class
	*/

	db: DatabaseConnector;

	constructor(db: DatabaseConnector) {
		this.db = db
		
		/*
		This is used to check on instantiation of the 'Brands' class whether the 'db' instance has established a Connection to ease debugging.
		If it has a connection it returns the 'con' attribute which we disregard but otherwise it will throw an error and break the program to prevent any further errors. 
		*/
	}
	
	/*
	We cannot predict the type of the return value of the Promise since it may be an error or an object of MySQL data and therefore we use the <any> type.
	*/
	request():Promise<any> {
		return new Promise((resolve, reject) => {
			this.db.getConnection.query("SELECT * FROM brands", (err: any, data: object, fields: any) => {
				return resolve(data)
			});
		});	
	};

	requestOne(id: number):Promise<object> {
		return new Promise((resolve, reject) => {
			this.db.getConnection.query("SELECT * FROM brands WHERE brand_id=?", [id] , (err: any, data: object, fields: any) => {
				return resolve(data)
			});
		});	
	};
}

export default Brands;