import { Distrito } from './distrito.model';

export class Concelho {
    
    countyId: number;
    countyCode: number;
    district: Distrito; 
    description: string;
    creationAt: string;
    updatedAt: string;
    
    constructor() {
        this.district = new Distrito();
    }
}