import { User } from 'src/app/api/models';

export class Product {
    id?: number;
    name?: string;
    description?: string;
    category?: string;
    price?: number;
    status?: string;
    expiry_dt?: Date;
    userId?: number;
    created_by?: string;
    created_dt?: Date;
    last_updated_by?: number;
    last_updated_dt?: Date;
    
	constructor() {}
}
