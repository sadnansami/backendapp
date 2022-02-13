import { DatabaseConnector } from "./DatabaseConnector";
import { IQuery } from "./Interfaces";

class Users extends DatabaseConnector implements IQuery {
	read():Promise<any> {
		return this.query("SELECT * FROM users")
	}
}

export default Users;