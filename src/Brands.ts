import { DatabaseConnector as db } from "./DatabaseConnector";
import { QueryInterface } from "./Interfaces";

class Brands extends db implements QueryInterface {
	/*
	'db' instance is private due to security reasons. 
	This can cause unexpected errors if the properties of 'db' are accessed from this class
	*/

	
	/*
	We cannot predict the type of the return value of the Promise since it may be an error or an object of MySQL data and therefore we use the <any> type.
	*/
	request():Promise<any> {
		return new Promise((resolve, reject) => {
			db.getConnection.query("SELECT * FROM brands", (err: any, data: object, fields: any) => {
				return resolve(data)
			});
		});	
	};

	requestOne(id: number):Promise<object> {
		return new Promise((resolve, reject) => {
			db.getConnection.query("SELECT * FROM brands WHERE brand_id=?", [id] , (err: any, data: object, fields: any) => {
				return resolve(data)
			});
		});	
	};
}

export default Brands;