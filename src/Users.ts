import Database from "./Database";

class Users extends Database {
	read():Promise<any> {
		return this.query("SELECT * FROM users")
	}
}

export default Users;