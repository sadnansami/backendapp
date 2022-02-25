import Hash from "./Hash";

class PatternMatching extends Hash {
	readonly CODES = "#abcdefghijklmnopqrstuvwxyz1234567890-_+&():/"

	match(string: string, pattern: string): boolean {
		string = this.filter(string)
		pattern = this.filter(pattern)
		
		//A window is part of the entire string for which the hash is calculated and is as long as the pattern is.
		let windowLower = 0;
		let windowUpper = pattern.length;
		let hashPattern = this.fingerprint(pattern)
		let currentWindow = string.slice(windowLower, windowUpper)
		let hashWindow = 0;

		//Use Do-While loop instead of regular one since in the last run the the windowUpper is greater than the string length when the pattern is exactly identical to the string
		do {
			if(windowLower == 0) {
				hashWindow = this.fingerprint(currentWindow)

				//Compare Hash
				if(hashWindow == hashPattern) {
					//Compare actual values
					if(currentWindow == pattern) {
						return true
					}
				}
			}

			let firstTermHash = this.fingerprint(currentWindow[0]) * (this.CODESLENGTH ** (pattern.length - 1))			
			let nextTermHash  = this.fingerprint(string[windowUpper])
			
			hashWindow = (hashWindow - firstTermHash) * this.CODESLENGTH + nextTermHash

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