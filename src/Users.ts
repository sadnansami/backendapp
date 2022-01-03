import { DatabaseConnector as db} from "./DatabaseConnector";
import { DBInterface } from "./Interfaces";

class Users extends db implements DBInterface {
	request():Promise<object> {
		return new Promise((resolve, reject) => {
			db.getConnection.query("SELECT * FROM users", (err: any, data: object, fields: any) => {
				return resolve(data)
			})
		})
	}
}

export default Users;