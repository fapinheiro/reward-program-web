export class User {
    
    id: number;
    login: string;
    password: string; 
    creationAt: string;

    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }

    
}