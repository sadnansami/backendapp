import HashFunctions from "./HashFunctions";
import LinkedList from "./LinkedList";

class Cache extends HashFunctions{
	readonly SIZE = 97

	private hashTable = new Array(this.SIZE)
	
	hash(string: string): number {
		string = this.simplify(string)
		let carryDigit = 0;
		let hashValue = "";
		
		console.log("character,", "code,", "one's digit + carry,", "subtotal");


		[...string].forEach((char: any) => {
			try {
				//Returns index of character in CODE as a string
				const charCode = this.CODES.indexOf(char).toString()

				if(charCode == "-1") {
					console.log(string, char)
					throw  "Error: Invalid String cannot be Hashed!"
				}


				console.log(char, charCode, parseInt(charCode.at(-1)!) + carryDigit, parseInt(charCode.at(-1)!) + carryDigit + hashValue)
				hashValue = parseInt(charCode.at(-1)!) + carryDigit + hashValue

				if(charCode.length == 2) {
					carryDigit = parseInt(charCode[0])
				}
			} catch(err) {
				throw err
			}
		})
		
		return parseInt(hashValue)
	}

	checksum(hash: number): number {
		let sum = 0;

		[...hash.toString()].forEach((digit) => {
			sum += parseInt(digit)
		})

		sum = sum % this.SIZE;

		return sum
	}

	add(hash: number, data: any): void {
		const index = this.checksum(hash)
		if(this.hashTable[index] == undefined) {
			this.hashTable[index] = new LinkedList(data)
		} else {
			this.hashTable[index].append(data)
		}
	}

	read(location: number): any {
		try {
			if(location > this.SIZE || location < 0) {
				throw "Error: Index Location of Hashtable given is invalid!"
			}

			return this.hashTable[location]
		} catch(err) {
			throw err
		}
	}
}

export default Cache;