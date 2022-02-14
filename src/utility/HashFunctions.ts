class HashFunctions {
	readonly CODES = "#abcdefghijklmnopqrstuvwxyz1234567890-_+&():/";
	readonly CODESLENGTH = this.CODES.length - 1


	simplify(string: string): string {
		//Remove whitespaces, then make string lowercase
		return string.split(" ").join("").toLowerCase()
	}

	customHash(string: string): number {

		string = this.simplify(string)
		let carryDigit = 0;
		let hashValue = "";

		[...string].forEach((char: any) => {
			try {
				//Returns index of character in CODE as a string
				const charCode = this.CODES.indexOf(char).toString()

				if(charCode == "-1") {
					throw  "Error: Invalid String cannot be Hashed!"
				}
				
				//The one's digit plus the carry digit from the digit before it
				let tempOnesDigit = (parseInt(charCode.at(-1)!) + carryDigit).toString()

				//In case 'tempOnesDigit' is greater than 9 then reset carry digit make the new carry digit its ten's digit
				carryDigit = 0
				if(tempOnesDigit.length == 2) {
					carryDigit += parseInt(tempOnesDigit.at(0)!)
				}

				//concatenate hashValue with 'tempOnesDigit's
				hashValue = tempOnesDigit.at(-1) + hashValue


				//if the charCode has 2 digits add the ten's digit to the carry digit
				if(charCode.length == 2) {
					carryDigit += parseInt(charCode[0])
				}
			} catch(err) {
				throw err
			}
		})

		//If the final digit has a carry digit, concatenate it to the hashValue
		if(carryDigit > 0) {
			hashValue = carryDigit + hashValue;
		}
		
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