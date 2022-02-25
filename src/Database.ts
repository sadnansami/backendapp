import mysql2, { Pool } from "mysql2/promise";
import { Credentials } from "./Interfaces";
import Cache from "./utility/Cache";

export abstract class Database {
	protected static connection: Pool;
	//Gets the name of the class and uses this as the table name to dynamically check the checksum of all the IDs in that table
	table = this.constructor.name
	protected cache = new Cache();

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
		let rawQueryResult: any;
		let res: any;
		try {
			if(typeof Database.connection == "undefined") {
				throw "Error: No established connection to MySQL Server"
			}

			if(typeof args == "undefined") {
				[rawQueryResult] = await Database.connection.query(sql)
			} else {
				[rawQueryResult] = await Database.connection.execute(sql, args)
			}

			res = await rawQueryResult

			return res
		} catch(err) {
			throw err
		}
	}

	protected async cacheHandler(idField: string, data: any):Promise<any> {
		//Always query checksum to check for any changes in the database
		const checksum = await this.query(`SELECT MOD(SUM(${idField}), ${this.cache.SIZE}) AS value from ${this.table}`)

		//If cache is empty or the checksum's are not identical then update Cache with new data
		if(typeof this.cache.checksum == "undefined" || this.cache.checksum != checksum[0].value) {
			//Add each row from the data into the cache
			data.forEach((row: any) => {
				this.cache.add(row[idField], row)
			});

			//Update new checksum
			this.cache.checksum = checksum[0].value
		}
	}
}

export default Database;
