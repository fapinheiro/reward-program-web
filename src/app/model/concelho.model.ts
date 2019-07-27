import { Distrito } from './distrito.model';

export class Concelho {
    
    idConcelho: number;
    codConcelho: number;
    distrito: Distrito; 
    nomeConcelho: string;
    creationAt: string;
    updatedAt: string;
    
    constructor() {
        this.distrito = new Distrito();
    }
}