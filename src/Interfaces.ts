export interface Credentials {
	HOST:string;
	USER:string;
	PASSWORD:string;
	DB:string;
};

export interface QueryInterface {
	request(): any;
};