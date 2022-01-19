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
	private con!: Pool;

	private constructor() {}

	set setConnection(credentials: Credentials) {
		/*
		'createPool()' opens a continuous parallel connection where multiple queries can be executed on the same connection and this returns an object with the type 'Pool'
		*/
		this.con = mysql2.createPool({
			host: credentials.HOST,
			user: credentials.USER,
			password: credentials.PASSWORD,
			database: credentials.DB,
			multipleStatements: true
		})

		this.con.getConnection()
			.then(() => {
				console.info("Successfully connected to MySQL Server!")
			}).catch((err) => {
				throw err
			})
			
	}

	get getConnection() {
		if(!this.con) {
			throw "Error - Instance of 'DatabaseConnector' was invoked without establishing a connection to Server"
		}

		return this.con
	}

	static createInstance(credentials: Credentials) {
		if(!this.instance) {
			this.instance = new DatabaseConnector()
		}

		this.instance.setConnection = credentials

		return this.instance
	}

	async query(sql: string):Promise<object>;
	async query(sql: string, parameters: Array<any>):Promise<object>;
	
	async query(arg1: string, arg2?: Array<any>):Promise<object> {
		let res: any;
		try {
			if(!arg2) {
				console.log("query");
				[res] = await this.con.query(arg1)

				return res
			} else {
				console.log("execute")
				res = await this.con.execute(arg1, arg2)
			}
			//res = await this.con.execute("SELECT * FROM brands WHERE brand_id=?", ...arg2)
		} catch(err) {
			res.iojw
		} finally {
			return res
		}
	}
}