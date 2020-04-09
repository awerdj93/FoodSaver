export class Review {
  	user_id: number;
	star_rating: number;
	remarks?: string;
	created_by?: string;
	created_dt?: Date;
	last_updated_by?: string;
	last_updated_dt?: Date;

	constructor() {}
}