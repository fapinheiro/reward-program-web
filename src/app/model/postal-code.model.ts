import { Concelho } from './concelho.model';

export class PostalCode {
    
    idCodigoPostal: number;
    concelho: Concelho;
    codigoPostal: string;
    localidade: string;
    creationAt: string;
    updatedAt: string;
    
    constructor() {
        this.concelho = new Concelho();
    }
    
}