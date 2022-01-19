import { DatabaseConnector } from "./DatabaseConnector";
import { QueryInterface } from "./Interfaces";

class Users implements QueryInterface {

	constructor(private db: DatabaseConnector) {}

	read():Promise<object> {
		return this.db.query("SELECT * FROM users")
	}
}

export default Users;