import mysql2, { Pool } from "mysql2/promise";
import { Credentials } from "./Interfaces";

export class DatabaseConnector {
	/*
	'con' is only assigned at a later stage, which means we would have to let it be 'unknown' or 'Pool'.
	This compromises security since otherwise any value could be assigned to 'con' and therefore it could break the program. 
	Compiler doesn't allow it to be of type 'Pool' only unless it is assigned in the constructor so it is forced by the '!' operator
	which asserts to the compiler that the value is definitely not null (i.e: unknown)
	*/
	private static instance: DatabaseConnector;
	static connection: Pool;

	static setConnection(credentials: Credentials) {
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
	async query(sql: string, parameters: any[]): Promise<any>;
	
	async query(arg1: string, arg2?: any[]): Promise<any> {
		let res: any;
		try {
			if(typeof DatabaseConnector.connection == "undefined") {
				throw "Error: No established connection to MySQL Server"
			}

			if(!arg2) {
				[res] = await DatabaseConnector.connection.query(arg1)

				return res
			} else {
				res = await DatabaseConnector.connection.execute(arg1, arg2)
			}
			//res = await this.con.execute("SELECT * FROM brands WHERE brand_id=?", ...arg2)
		} catch(err) {
			throw err
		}
	}
}

export default DatabaseConnector;