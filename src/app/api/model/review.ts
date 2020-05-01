export class Review {
	id: number;
	userId: number;
	reviewerName: string;
	sellerId: number;
	productId: number;
	productName: string;
	starRating: number;
	remarks?: string;
	createdBy?: number;
	createdDate?: Date;
	lastUpdatedBy?: number;
	lastUpdatedDate?: Date;
	
	constructor() { }
}