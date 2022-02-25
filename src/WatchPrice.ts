import Database from "./Database";
import { IDatabase } from "./Interfaces";
import PriceFilter from "./PriceFilter";
import fs from "fs"

class WatchPrice extends Database implements IDatabase {
	async create(id: number): Promise<any> {
		const prices = JSON.parse(fs.readFileSync("./GMTMasterIIPrices.json", "utf-8"))

		let valuesString = "";

		console.log()
		prices.forEach((price: any) => {
			valuesString += `(${id}, "${price.date}", ${price.price}),`;
		});

		valuesString = valuesString!.slice(0, -1);

		const res = await this.query(
			`INSERT INTO watch_price
				(
					watch_id,
					date,
					price
				)
			VALUES
				${valuesString}`
		)
		
		return res
	}

	async read(watch_id: number): Promise<any> {
		const res = await this.query(
			`SELECT
				DATE_FORMAT(date, "%e %b %Y") AS date,
				price
			FROM watch_price
			WHERE watch_id=${watch_id}`
		)

		return res;
	}

}

export default WatchPrice;