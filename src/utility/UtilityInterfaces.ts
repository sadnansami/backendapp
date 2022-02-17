import { Node } from "./LinkedList";

export interface IStack {
    push(data: any): void;
    pop(): Node;
}

export interface ICache {
    add(hash: number, data: any): void;
    read(): any
}