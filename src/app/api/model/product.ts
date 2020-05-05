import { User } from 'src/app/api/models';

export class Product {
    id?: number;
    name?: string;
    userId?: number;
    description?: string;
    price?: number;
    expiryAt?: any;
    base64Data: string;
	s3ImagePath: string;
    
	constructor() {}
}
