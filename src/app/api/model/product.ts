import { User } from 'src/app/api/models';

export class Product {
    id?: number;
    name?: string;
    description?: string;
    category?: string;
    price?: number;
    status?: string;
    expiry_dt?: Date;
    created_by?: User;
    created_dt?: Date;
    last_updated_by?: User;
    last_updated_dt?: Date;
    
	constructor() {}
}
