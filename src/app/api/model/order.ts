import { User, Product } from 'src/app/api/models';

export interface Order {
    id?: number;
    buyer: User;
    seller: User;
    product: Product;
    createdBy: User;
    createdOn: Date;
    changedBy: User;
    changedOn: Date;
} 