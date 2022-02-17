import { DatabaseConnector } from "./Database";
import { IDatabase } from "./Interfaces";
import Cache from "./utility/Cache";

class Brands extends DatabaseConnector implements IDatabase {
	cache = new Cache()

	read(id?: number):Promise<any> {
		//Always query checksum to check for any changes in the database
		return this.query(`SELECT MOD(SUM(brand_id), ${this.cache.SIZE}) AS checksum from brands`)
			.then((checksum) => {
				//If cache is empty or the checksum's are not identical then update Cache with new data
				if(typeof this.cache.checksum == "undefined" || this.cache.checksum != checksum[0].checksum) {
					return this.query("SELECT * from brands")
						.then((brands) => {
							//Add each brand from database into the cache
							brands.forEach((brand: any) => {
								this.cache.add(brand.brand_id, brand)
							});

							//Update new checksum
							this.cache.checksum = checksum[0].checksum
						})
				}
			})
			.then(() => {
				//The 'read' method in the Cache has 2 overloads, one which accepts an index to be accessed and one which returns the entire Cache as an array
				return this.cache.read(id!)
			})
	};

	readOne(id: number):Promise<any> {
		return this.query("SELECT * FROM brands WHERE brand_id=?", [id])	 
	};
}

export default Brands;