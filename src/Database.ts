import mysql2, { Pool } from "mysql2/promise";
import { Credentials } from "./Interfaces";
import Cache from "./utility/Cache";

export class Database {
	protected static connection: Pool;
	table: string;
	cache = new Cache();

	constructor(table: string) {
		this.table = table
	}

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

	read(id?: number):Promise<any> {
		//Always query checksum to check for any changes in the database
		return this.query(`SELECT MOD(SUM(id), ${this.cache.SIZE}) AS checksum from ${this.table}`)
			.then((checksum) => {
				//If cache is empty or the checksum's are not identical then update Cache with new data
				if(typeof this.cache.checksum == "undefined" || this.cache.checksum != checksum[0].checksum) {
					return this.query(`SELECT * from ${this.table}`)
						.then((tableData) => {
							//Add each watch from database into the cache
							tableData.forEach((row: any) => {
								this.cache.add(row.id, row)
							});

							//Update new checksum
							this.cache.checksum = checksum[0].checksum
						})
				}
			})
			.then(() => {
				//The 'read' method in the Cache has 2 overloads, one which accepts an index to be accessed and one which returns the entire Cache as an array
				return this.cache.read(id!)
			})
	}
}

export default Database;
