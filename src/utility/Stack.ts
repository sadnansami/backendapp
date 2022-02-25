import { Node, LinkedList } from "./LinkedList";
import { IStack } from "../Interfaces";

export class Stack extends LinkedList implements IStack {    
    topPointer: Node
    
    constructor(head?: any) {
        super(head);

		//topPointer is an alias for 'self.head' from LinkedList constructor in Stack terminology
        this.topPointer = this.head
    }

    push(data: any):void {
        let newNode = new Node(data)

        newNode.next = this.topPointer
        this.topPointer = newNode
    }

    pop(): Node {
        let oldTopPointer = this.topPointer

        if(oldTopPointer.data == null) {
            throw ReferenceError("Error: Stack Underflow!")
        }

        this.topPointer = this.topPointer.next!

        return oldTopPointer.data
    }
}

export default Stack;