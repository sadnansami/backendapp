import mysql2, { Pool } from "mysql2";
import { Credentials } from "./Interfaces";

export abstract class DatabaseConnector {
	/*
	'con' is only assigned at a later stage, which means we would have to let it be 'unknown' or 'Pool'.
	This compromises security since otherwise any value could be assigned to 'con' and therefore it could break the program. 
	Compiler doesn't allow it to be of type 'Pool' only unless it is assigned in the constructor so it is forced by the '!' operator
	which asserts to the compiler that the value is definitely not null (i.e: unknown)
	*/
	private static con: Pool;

	static set setConnection(credentials: Credentials) {
		/*
		'createPool()' opens a continuous parallel connection where multiple queries can be executed on the same connection and this returns an object with the type 'Pool'
		*/
		this.con = mysql2.createPool({
			host: credentials.HOST,
			user: credentials.USER,
			password: credentials.PASSWORD,
			database: credentials.DB
		})

		this.con.getConnection((err) => {
			if(err) {
				throw err.code
			} else {
				console.info("Successfully connected to MySQL Server!")
			}
		})
	}


	static get getConnection() {
		if(!this.con) {
			throw "Error - 'con' attribute was accessed through 'getConnection' without establish a connection to Server"
		}

		return this.con
	}
}