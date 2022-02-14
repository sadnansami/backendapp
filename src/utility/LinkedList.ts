export class Node {
	data: any;
	next: Node | null;
	
	constructor(data: any) {
		//Doubly Linked list using previous and next Node pointer initially set as the Node itself
		this.data = data
		this.next = null
	}
}

export class LinkedList {
	head: Node;

	constructor(head?: any) {
		//If no 'head' argument has been passed then set to 'null'
		this.head = new Node(head || null)
	}

	append(data: any) {
		if(this.head.data == null) {
			this.head.data = data

			return
		}

		let currentNode = this.head

		while(currentNode.next) {
			currentNode = currentNode.next
		}

		currentNode.next = new Node(data)
	}

	delete():void {
		if(this.head.next == null) {
			this.head.data = null

			return
		}

		let currentNode = this.head
		let prevNodeTracker: Node;

		while(currentNode.next) {
			prevNodeTracker = currentNode
			currentNode = currentNode.next
		}

		prevNodeTracker!.next = null
	}

	iterate(index: Node = this.head): any {
		let list: any[];
		if(index.next != null) {
			//Get the value of the next Node recursively
			list = this.iterate(index.next)
			// add it to the list in Reverse order so the final output is in the order it was called
			list = [index.data, ...list]
		} else {
			//If its the final Node in the Linked List then return its value as an array since it otherwise distributes all the characters in the string as if it was an Array
			return [index.data]

		}

		return list
	}
}

export default LinkedList;