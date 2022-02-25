import { Node } from "./utility/LinkedList";
import express from "express";

export interface Credentials {
	HOST:string;
	USER:string;
	PASSWORD:string;
	DB:string;
};

export interface IDatabase {
	read(id?: number): Promise<any>;
}

export interface IUser {
	user_id: string,
	user: string,
	email: string,
}

export interface IStack {
    push(data: any): void;
    pop(): Node;
}

export interface ICache {
    add(hash: number, data: any): void;
    read(): any
}