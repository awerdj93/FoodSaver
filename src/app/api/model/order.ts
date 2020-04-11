import { Address, Item } from 'src/app/api/models';

export class Order {
    items: Array<Item>;
    userId: number;
    totalPrice: number;
    subTotalPrice: number;
    billingAddress?: Address;
    deliveryAddress?: Address;

    constructor() {}
} 