export class Review {
	id: number;
	userId: number;
	sellerId: number;
	productId: number;
	starRating: number;
	remarks?: string;
	createdBy?: number;
	createdDate?: Date;
	lastUpdatedBy?: number;
	lastUpdatedDate?: Date;
	
	constructor() { }
}