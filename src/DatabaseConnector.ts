import mysql2, { Connection } from "mysql2";
import { Credentials, DBInterface } from "./Interfaces";

class DatabaseConnector {
	/*
	By default (i.e: on instantiation) If no connection to a MySQL server is established, the 'con' attribute is of 'any type. 
	It can either be of 'any' or the 'Connection' type if its an instance of it.
	This means that it's prone to a fatal error, which causes a runtime error where it actually has the value 'undefined'
	but a MySQL query is trying to access a property of 'con' called 'query' which doesnt actually exist.
	The runtime error is very vague and thus makes debugging very difficult since it cannot be easily pointed out where the root of the problem is.
	Therefore we need utilize defensive programming and perform error checking.
	To prevent this we need to break the program and throw an error which indicates that the cause of the error is the absence of a connection 
	and stems from the 'DatabaseConnector' class.
	*/
	private con: undefined | Connection;

	constructor(private credentials: Credentials) {};

	request() {
		this.con = mysql2.createConnection({
			host: this.credentials.HOST,
			user: this.credentials.USER,
			password: this.credentials.PASSWORD,
			database: this.credentials.DB
		});

		this.con.connect((err: any): void => {
			if(err) {
				throw err;
			} else {
				console.log("Successfully connected to MySQL Server!")
			};
		})
	}

	get getCredentials(): Credentials {
		return this.credentials;
	}

	get getConnection(): Connection {
		if(typeof this.con == "object") {
			return this.con
		} else {
			throw "Error - Property 'DatabaseConnector.getConnection' was accessed without already establishing a connection to a MySQL Server. This may be due to an instance of the 'DatabaseConnector' class being passed into another class without calling 'Database.request' method() prior to it."
		}
	}
}

export default DatabaseConnector;