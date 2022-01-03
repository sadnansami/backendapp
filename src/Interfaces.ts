import Connection from "mysql2/typings/mysql/lib/Connection";

export interface Credentials {
	HOST:string;
	USER:string;
	PASSWORD:string;
	DB:string;
};

export interface DBInterface {
	request(): any;
	
};