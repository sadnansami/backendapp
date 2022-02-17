export interface Credentials {
	HOST:string;
	USER:string;
	PASSWORD:string;
	DB:string;
};

export interface IDatabase {
	query(sql: string, args: any[]): Promise<any>;
	read(): Promise<any>;
}