import Database from "./Database";
import { IUser } from "./Interfaces";

class Users extends Database {
	async create(user: IUser):Promise<any> {
		try {
			const insertUser = await this.query(
				`INSERT INTO users(
					user_id,
					user,
					email,
					status
				) VALUE (?, ?, ?, "standard")`,
				[
					user.user_id,
					user.user,
					user.email,
				]
			)

			//If Insert is successful, then it returns affected rows as 1
			if(insertUser.affectedRows == 1) {
				//Return modified user Object rather than querying for efficiency
				return {...user, "status": "standard"}
			}
		} catch(err) {
			throw "Error: Creating User failed with error: " + err
		}

		
	}

	async read(id?: string):Promise<any> {
		let res: any;

		if(typeof id != "undefined") {
			res = await this.query("SELECT * FROM users WHERE user_id=?", [id])
			res = res[0]
		} else {
			res = await this.query("SELECT * FROM users")
		}

		return res
	}
}

export default Users;