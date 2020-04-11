import { Product } from '../models';

export class Cart {
	totalPrice?: number;
	products?: Array<Product>;

    constructor() {}
}