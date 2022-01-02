import Connection from "mysql2/typings/mysql/lib/Connection";
import DatabaseConnector from "./DatabaseConnector";

export interface Credentials {
	HOST:string;
	USER:string;
	PASSWORD:string;
	DB:string;
};

export interface DBInterface {
	db: DatabaseConnector
	
};