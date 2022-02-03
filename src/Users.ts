import { DatabaseConnector } from "./DatabaseConnector";
import { IQuery } from "./Interfaces";

class Users implements IQuery {

	constructor(private db: DatabaseConnector) {}

	read():Promise<any> {
		return this.db.query("SELECT * FROM users")
	}
}

export default Users;