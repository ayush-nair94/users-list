export interface IUser {
    avatar: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    expanded: boolean;
    state: string;
}

export class User implements IUser {
    avatar: string = '';
    email: string = '';
    first_name: string = '';
    id: number = 0;
    last_name: string = '';
    expanded: boolean = false;
    state: string = '';

    constructor() {}
}