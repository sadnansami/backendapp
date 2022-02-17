import DatabaseConnector from "./Database";
import { IDatabase } from "./Interfaces";

class Watches extends DatabaseConnector implements IDatabase{
	create():Promise<any> {
		return this.query(`
			INSERT INTO watches(
				brand_id,
				name,
				model,
				case_material,
				case_diameter,
				case_bezel_material,
				case_dial_colour,
				strap_material,
				strap_colour,
				strap_clasp_type,
				strap_clasp_material,
				release_year
			) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				1,
				'Rolex GMT II',
				'16710T',
				'Steel',
				'40x40mm',
				'Steel',
				'Black/Red',
				'Steel',
				'Metallic Gray',
				'Fold clasp',
				'Steel',
				2006
			])
	}
	

	read(id?: number):Promise<any> {
		//Always query checksum to check for any changes in the database
		return this.query(`SELECT MOD(SUM(watch_id), ${this.cache.SIZE}) AS checksum from watches`)
			.then((checksum) => {
				//If cache is empty or the checksum's are not identical then update Cache with new data
				if(typeof this.cache.checksum == "undefined" || this.cache.checksum != checksum[0].checksum) {
					return this.query("SELECT * from watches")
						.then((watches) => {
							//Add each watch from database into the cache
							watches.forEach((watch: any) => {
								this.cache.add(watch.watch_id, watch)
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
	}

	updateOne(id: number) {
		return new Promise((resolve, reject) => {
			//db.getConnection.execute()
		})
	}
}

export default Watches;