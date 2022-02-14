import HashFunctions from "./HashFunctions";
import LinkedList, { Node } from "./LinkedList";

class Cache extends HashFunctions{
	readonly SIZE = 97
	
	hashTable = new Array(this.SIZE)
	private _checksum!: number;

	add(hash: number, data: any): void {
		let index = hash % this.SIZE;

		if(this.hashTable[index] == undefined) {
			this.hashTable[index] = new LinkedList(data)
		} else {
			this.hashTable[index].append(data)
		}
	}

	read(): any;
	read(hash: number): any;
	read(hash?: number): any {
		if(hash) {
			let index = hash % this.SIZE;

			try {
				if(index > this.SIZE || index < 0) {
					throw "Error: Index Location of Hashtable given is invalid!"
				}

				return this.hashTable[index].head
			} catch(err) {
				throw err
			}
		} else {
			let entries: any[] = []
			this.hashTable.forEach((slot) => {
				//Traverse every slot of the Hashtable
				slot = slot.iterate()
				entries.push(...slot)
			})

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