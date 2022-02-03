import { Node } from "./LinkedList";

export interface IStack {
    push(data: any): void;
    pop(): Node;
}