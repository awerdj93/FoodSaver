export class Review {
	id: number;
	userId: number;
	sellerId: number;
	productId: number;
	starRating: number;
	remarks?: string;
	createdBy?: string;
	createdDatet?: Date;
	lastUpdatedBy?: string;
	lastUpdatedDate?: Date;
	
	constructor() { }
}