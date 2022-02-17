import HashFunctions from "./HashFunctions";
import LinkedList, { Node } from "./LinkedList";
import { ICache } from "./UtilityInterfaces";

class Cache extends HashFunctions implements ICache {
	readonly SIZE = 97
	
	hashTable = new Array(this.SIZE)
	private _checksum!: number;

	add(hash: number, data: any): void {
		let index = hash % this.SIZE;

		if(this.hashTable[index] == undefined) {

			this.hashTable[index] = new LinkedList({hash: hash, data:data})
		} else {
			if(this.hashTable[index].head.data[0] == hash) {
				throw "Error: An item already exists with the same hash in the Cache!"
			}
			this.hashTable[index].append({hash: hash, data:data})
		}
	}

	read(): any;
	read(hash: number): any;
	read(hash?: number): any {
		if(hash) {
			let index = hash % this.SIZE;

			try {
				if(index < 0 || index > this.SIZE ) {
					throw "Error: Index Location of Cache given is invalid!"
				}
			
				return this.hashTable[index].iterateAll()
			} catch(err) {
				throw err
			}
		} else {
			let entries: any[] = []
			this.hashTable.forEach((slot) => {
				//Traverse every slot of the Hashtable
				slot = slot.iterateAll()
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