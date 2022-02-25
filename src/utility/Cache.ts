import Hash from "./Hash";
import LinkedList, { Node } from "./LinkedList";
import { ICache } from "../Interfaces";

class Cache extends Hash implements ICache {
	readonly SIZE = 97
	
	hashTable = new Array(this.SIZE)
	private _checksum!: number;

	add(hash: number, data: any): void {
		let index = hash % this.SIZE;

		if(this.hashTable[index] == undefined) {
			this.hashTable[index] = new LinkedList({hash: hash, data: data})

		} else {
			if(this.hashTable[index].head.data[0] == hash) {
				throw "Error: An item already exists with the same hash in the Cache!"
			}

			this.hashTable[index].append({hash: hash, data: data})
		}
	}

	find(currentNode: Node, hash: number): any {
		//While loop with condition 'currentNode.next' doesnt work since it breaks the loop before checking the last Node
		while(true) {
			if(currentNode.data.hash == hash) {
				return currentNode.data
			}

			currentNode = currentNode.next!

			if(currentNode == null) {
				break
			} 
		}
	}

	iterateAll(currentNode: Node): any[] {
		let list: any[] = [];

		if(currentNode.next != null) {
			//Get the value of the next Node recursively			
			list = this.iterateAll(currentNode.next)
			// Reassign list to be the Node from the recursion call plus the content of the existing list together as a new list.
			list = [currentNode.data, ...list]
		} else {
			//If its the final Node in the Linked List then return its value as an array since it otherwise distributes all the characters in the string as if it was an Array
			return [currentNode.data]

		}		

		return list
	}

	read(): any;
	read(hash: number): any;
	read(hash?: number): any {
		if(hash) {
			try {
				let index = hash % this.SIZE;

				return this.find(this.hashTable[index].head, hash)
			} catch {
				throw `Error: Cache does not contain any data for Hash: ${hash}`;
			}
		} else {
			let entries: any[] = []

			this.hashTable.forEach((node) => {
				//Traverse every slot of the Hashtable
				let allNodes = this.iterateAll(node.head)
				entries.push(...allNodes)
			})

			if(entries.length == 0) {
				throw "Error: Cache is empty!";
			}

			return entries			
		}
		
	}

	set checksum(newChecksum: number) {
		this._checksum = newChecksum;
	}

	get checksum() {
		return this._checksum;
	}
}

export default Cache;