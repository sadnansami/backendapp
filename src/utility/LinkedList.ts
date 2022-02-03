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
}

export default LinkedList;