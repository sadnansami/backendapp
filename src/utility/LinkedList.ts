export class Node {
	data: any;
	next: Node | null;
	
	constructor(data: any) {
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

	append(data: any):void {
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
		let prevNode: Node;

		while(currentNode.next) {
			prevNode = currentNode
			currentNode = currentNode.next
		}

		prevNode!.next = null
	}
}

export default LinkedList;