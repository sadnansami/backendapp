import DatabaseConnector from "./DatabaseConnector";
import { DBInterface } from "./Interfaces";

class Users implements DBInterface {
	/*
	'db' instance is private due to security reasons. 
	This can cause unexpected errors if the properties of 'db' are accessed from this class
	*/

	db: DatabaseConnector;

	constructor(db: DatabaseConnector) {
		this.db = db;

		db.getConnection
	}

	request():Promise<object> {
		return new Promise((resolve, reject) => {
			this.db.getConnection.query("SELECT * FROM users", (err: any, data: object, fields: any) => {
				return resolve(data)
			})
		})
	}
}

export default Users;