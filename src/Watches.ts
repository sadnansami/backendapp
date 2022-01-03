import { DatabaseConnector as db } from "./DatabaseConnector";
import { QueryInterface } from "./Interfaces";

class Watches extends db implements QueryInterface {

	request():Promise<object> {
		return new Promise((resolve, reject) => {
			db.getConnection.query("SELECT * FROM watches", (err: any, data: object, fields: any) => {
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
				db.getConnection.query("SELECT * FROM watches WHERE watch_id=?", [id] , (err: any, data: any, fields: any) => {
					return resolve(data)
				});
			}
		});	
	};
}

export default Watches;