import { Client } from './client.model';

export class Indication {
    
    codIndication: number; 
    client: Client;
    name: string;
    email: string;
    phone: string;
    status: IndicationStatusEnum;
    creationAt: string;
    updatedAt: string;
    
}

export enum IndicationStatusEnum {
    CREATED = "CREATED",
    SENT = "SENT", 
    RESENT = "RESENT", 
    ACCEPTED = "ACCEPTED", 
    CONVERTED = "CONVERTED", 
    EXPIRED = "EXPIRED", 
    CANCELED = "CANCELLED"
}

export default Indication;