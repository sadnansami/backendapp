class Cache {
	readonly SIZE = 100;
	readonly CODES = "#abcdefghijklmnopqrstuvwxyz1234567890-_+&():/";


	hash(string: string): number;
	hash(string: string, mode: "full" | "partial"): number;
	
	hash(string: string, mode?: "full" | "partial"): number {
		let carryDigit = 0;
		let hashValue = "";
		
		[string].forEach((char: any) => {
			try {
				//Returns index of character in CODE as a string
				const charCode = this.CODES.indexOf(char).toString()

				if(charCode == "-1") {
					throw  "Error: Invalid String cannot be Hashed"
				}



				if(charCode.length == 2) {
					carryDigit += Number(charCode[0])
				}

				hashValue += carryDigit
				carryDigit = 0

				hashValue += charCode[-1]
			} catch(err) {
				throw err
			}
		})
		
		let sum = [string].reduce((total, add) => {
			return total + add;
		})
	}
}

export default Cache;