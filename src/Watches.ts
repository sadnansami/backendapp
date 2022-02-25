import Database from "./Database";
import { IDatabase } from "./Interfaces";
import PriceFilter from "./PriceFilter";

class Watches extends Database implements IDatabase {
	create():Promise<any> {
		return this.query(`
			INSERT INTO watches(
				watch_id,
				brand_id,
				watch_name,
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

	async read(id?: number): Promise<any> {
		const watches = await this.query(
			`SELECT
				watches.*,
				watch_images.image,
				brands.brand_name
			FROM watches
				LEFT JOIN watch_images ON watches.watch_id = watch_images.watch_id
				LEFT JOIN brands ON watches.brand_id = brands.brand_id
			GROUP BY watches.watch_id
		`)

		//Update cache on any changes
		return this.cacheHandler("watch_id", watches).then(() => {
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