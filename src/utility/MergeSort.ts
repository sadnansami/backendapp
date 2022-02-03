import { Stack } from "./Stack";

export class MergeSort {
	//For consistency across the module we assign the list to our own custom type called "any[]" which is basically an alias for "any[] | Object"
	private list: any[];
	key: any;
	
	constructor(list: any[], key?: any) {
		this.list = list;
		this.key = key || null;
	};

	compare(first: any, second: any): any {
		if(first < second) {
			return first
		} else if(first > second) {
			return second
		}
	}

	mergeList(left: any[], right: any[]) {
		//Tenporary List
		let orderedList = []

		//pointer to index location on each side
		let lpointer = 0
		let rpointer = 0

		while (lpointer < left.length && rpointer < right.length) {
			let lowerItem = this.compare(left[lpointer], right[rpointer])

			if(lowerItem == left[lpointer]) {
				orderedList.push(left[lpointer])
				lpointer += 1
			} else {
				orderedList.push(right[rpointer])
				rpointer += 1
			}
		}

		//Appends whatever is remaining
		while (lpointer < left.length) {
			orderedList.push(left[lpointer])
			lpointer += 1
		}

		while (rpointer < right.length) {
			orderedList.push(right[rpointer])
			rpointer += 1
		}

		return orderedList
	}

	sort(list: any[]): any[] {
		//Split List into two halves
		let left = list.slice(0, Math.floor(list.length / 2))
		let right = list.slice(Math.floor(list.length / 2))

		if(list.length > 1) {
			left = this.sort(left)
			right = this.sort(right)
		}


		this.list = this.mergeList(left, right)

		return this.list
	}

	reverse(): any[] {
		let stack = new Stack();
		let reversedList: any[] = [];
		
		this.list.forEach(item => {
			//the 'push()' method is part of the custom programmed solution for a stack
			stack.push(item)
		});

		this.list.forEach(item => {
			//Note: 'reversedList.push()' method is part of Javascript; mentioned to avoid confusion
			reversedList.push(stack.pop())
		});

		this.list = reversedList
		
		return this.list
	}

}