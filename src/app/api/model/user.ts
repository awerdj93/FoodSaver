import { Address } from 'src/app/api/models';

export class User {
    id?: number;
    name?: string;
	password?: string;
	email?: string;
	createdAt?: string;
	lastUpdatedAt?: string;

	constructor() {}
}