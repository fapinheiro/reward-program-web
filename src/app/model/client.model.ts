import { PostalCode } from './postal-code.model';
import { Address } from './address.model';
import { Identification } from './identification.model';
import { Contact } from './contact.model';

export class Client {
    
    clientId: number; 
    email: string;
    password: string;
    name: string;
    birthDate: string;
    address: Address;
    identifications: Identification[];
    contacts: Contact[];
    
}