import { Address } from 'src/app/api/models';

export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: number;
    password?: string;
    registeredOn: Date;
    lastLoginDate: Date;
   // address: Address;
  }
 
  