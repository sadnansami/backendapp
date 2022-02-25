import fs from "fs";

class PriceFilter {
	rawPrices: any;
	formattedPrices: any = [];
	

	constructor(filename: string) {
		this.rawPrices = JSON.parse(fs.readFileSync(filename, "utf-8"));
	}

	format() {
		this.rawPrices.coordinatesPostPurchase.forEach((price: any) => {
			this.formattedPrices.push({date: price.x.value, price: price.y.mean.value})
		});

		return this.formattedPrices
	}

	writeToFile(filename: string) {
		fs.writeFileSync(filename, JSON.stringify(this.formattedPrices), "utf-8")
	}
}

export default PriceFilter;