import { Concelho } from './concelho.model';

export class PostalCode {
    
    postalCodeId: number;
    county: Concelho;
    postalCode: string;
    locale: string;
    creationAt: string;
    updatedAt: string;
    
    constructor() {
        this.county = new Concelho();
    }
    
}