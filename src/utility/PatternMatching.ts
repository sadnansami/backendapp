class PatternMatching {
	readonly CODES = "#abcdefghijklmnopqrstuvwxyz1234567890-_+&():/"

	codesLength = this.CODES.length - 1

	simplify(string: string): string {
		return string.replace(" ", "").toLowerCase()
	}

	hash(string: string): number {
		let hashValue = 0;

		for (let char = 0; char < string.length; char++) {
			try {
				let codeOfChar = this.CODES.indexOf(string[char])

				hashValue += codeOfChar * (this.codesLength ** (-(char - string.length + 1)))
			} catch {
				throw "Error: String cannot be hashed because it is invalid!"
			}
		}

		return hashValue;
	}

	match(string: string, pattern: string): boolean {
		pattern = this.simplify(pattern)
		string = this.simplify(string)
		//A window is part of the entire string for which the hash is calculated and is as long as the pattern is.
		let windowLower = 0;
		let windowUpper = pattern.length;
		let hashPattern = this.hash(pattern)
		let currentWindow = string.slice(windowLower, windowUpper)
		let hashWindow = 0;

		//Use Do-While loop instead of regular one since in the last run the the windowUpper is greater than the string length when the pattern is exactly identical to the string
		do {
			if(windowLower == 0) {
				hashWindow = this.hash(currentWindow)

				//Compare Hash
				if(hashWindow == hashPattern) {
					//Compare actual values
					if(currentWindow == pattern) {
						return true
					}
				}
			}

			let firstTermHash = this.hash(currentWindow[0]) * (this.codesLength ** (pattern.length - 1))			
			let nextTermHash  = this.hash(string[windowUpper])
			
			hashWindow = (hashWindow - firstTermHash) * this.codesLength + nextTermHash

			windowLower += 1
			windowUpper += 1

			currentWindow = string.slice(windowLower,windowUpper)

			if(hashWindow == hashPattern) {
				if(currentWindow == pattern) {
					return true
				}
			}
		} while (windowUpper < string.length);

		return false
	}
}

export default PatternMatching;