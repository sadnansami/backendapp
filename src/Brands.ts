import Database from "./Database";
import { IDatabase } from "./Interfaces";

class Brands extends Database implements IDatabase {
	async read(id?: number): Promise<any> {
		const brands = await this.query("SELECT * from brands")

		//Update cache on any changes

		this.cacheHandler("brand_id", brands)

		return this.cache.read(id!)
	}
}

export default Brands;