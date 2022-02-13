class HashFunctions {
    readonly CODES = "#abcdefghijklmnopqrstuvwxyz1234567890-_+&():/";
	readonly CODESLENGTH = this.CODES.length - 1


    simplify(string: string): string {
		//Remove whitespaces, then make string lowercase
		return string.split(" ").join("").toLowerCase()
	}

    addition(string: string): number {
        
        string = this.simplify(string)
		let carryDigit = 0;
		let hashValue = "";

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

    fingerprint(string: string): number {
		let hashValue = 0;

		for (let char = 0; char < string.length; char++) {
			try {
				let codeOfChar = this.CODES.indexOf(string[char])

				hashValue += codeOfChar * (this.CODESLENGTH ** (-(char - string.length + 1)))
			} catch {
				throw "Error: String cannot be hashed because it is invalid!"
			}
		}

		return hashValue;
	}
}

export default HashFunctions;