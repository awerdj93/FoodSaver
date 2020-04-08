import { User } from 'src/app/api/models';

export interface Product {
    id?: number;
    name?: string;
    description?: string;
    type?: 'Canned' | 'Raw' | 'Cooked';
    price?: number;
    expiry?: Date;
    createdBy?: User;
    createdOn?: Date;
    changedBy?: User;
    changedOn?: Date;
}
