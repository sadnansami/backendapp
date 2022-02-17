import mysql2, { Pool } from "mysql2/promise";
import { Credentials } from "./Interfaces";
import Cache from "./utility/Cache";

export class Database {
	protected static connection: Pool;
	cache = new Cache();

	static connect(credentials: Credentials) {
		/*
		'createPool()' opens a continuous parallel connection where multiple queries can be executed on the same connection and this returns an object with the type 'Pool'
		*/
		this.connection = mysql2.createPool({
			host: credentials.HOST,
			user: credentials.USER,
			password: credentials.PASSWORD,
			database: credentials.DB,
			multipleStatements: true
		})

		this.connection.getConnection()
			.then(() => {
				console.info("Successfully connected to MySQL Server!")
			}).catch((err) => {
				throw "Error: Connection to MySQL Server failed!"
			})
			
	}

	async query(sql: string): Promise<any>;
	async query(sql: string, args: any[]): Promise<any>;
	
	async query(sql: string, args?: any[]): Promise<any> {
		let res: any;
		try {
			if(typeof Database.connection == "undefined") {
				throw "Error: No established connection to MySQL Server"
			}

			if(typeof args == "undefined") {
				[res] = await Database.connection.query(sql)

				return res
			} else {
				res = await Database.connection.execute(sql, args)
			}
		} catch(err) {
			throw err
		}
	}
}

export default Database;
