import { Product } from './product';

export class Item {
    id: number;
    name: string;
    price: number;
    quantity: number;

	constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.quantity = 1;
    }
} 