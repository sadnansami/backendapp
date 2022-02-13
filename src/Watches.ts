import { DatabaseConnector } from "./DatabaseConnector";
import { IQuery } from "./Interfaces";

class Watches extends DatabaseConnector implements IQuery {
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

	read():Promise<any> {
		return this.query("SELECT * FROM watches")	
	}

	readOne(id: number):Promise<any> {
		return this.query("SELECT * FROM watches WHERE watch_id=?", [id])	
	};

	updateOne(id: number) {
		return new Promise((resolve, reject) => {
			//db.getConnection.execute()
		})
	}
}

export default Watches;